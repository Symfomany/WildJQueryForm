/**
 * This example:
 *  Uses the built-in BrowserSync server for HTML files
 *  Watches & compiles SASS files
 *  Watches & injects CSS files
 */
let browserSync = require('browser-sync');
let gulp = require('gulp');
let sass = require('gulp-sass');
let size = require('gulp-size');
let uncss = require('gulp-uncss');
let filter = require('gulp-filter');
let concat = require('gulp-concat');
let notify = require("gulp-notify");
let minifyCss = require('gulp-minify-css');
let autoprefixer = require('gulp-autoprefixer');
let rename = require('gulp-rename');
let clean = require('gulp-clean');
let cache = require('gulp-cache');
let imagemin = require('gulp-imagemin');
let sourcemaps = require('gulp-sourcemaps');
let plumber = require('gulp-plumber');
let ngmin = require('gulp-ngmin');
let gutil = require("gulp-util");
let path = require('path');
let jshint = require('gulp-jshint');
let stylish = require('jshint-stylish');
let templateCache = require('gulp-angular-templatecache');

//init tyo reload brower
let reload = browserSync.reload;
let validator = require('is-my-json-valid/require')


/**
 * Handler Errors
 * @param {any} err
 */
function handleError(err) {
    console.log("************************************************** ERRORS*******************************************************");
    gutil.log('error', 'An error to compile/transpile', gutil.colors.bold.dim.white.bgRed(err.toString()));
    console.log(err.toString());
    console.log("************************************************** ERRORS*******************************************************");
    notifier.notify({
        title: ' Erreur de Compilation ',
        message: err.toString(),
        icon: path.join(__dirname, 'js.jpg'),
        sound: true,
        wait: true
    });
    this.emit('end');
}


// Browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function () {
    browserSync({
        port: 8066,
        server: {
            baseDir: "./", //base
            index: "index.html" //fichier a chargé
        }
    });
});

gulp.task('browser-reload', function () {
    reload({ stream: true });
});

gulp.task('clean', function () {
    return gulp.src(['dist/css', 'dist/js', 'dist/images'], { read: false })
        .pipe(clean());
});


/**
 * Compress images
 * @return {Stream}
 */
gulp.task('images', ['clean-images'], function () {
    return gulp
        .src('./images')
        .pipe(imagemin({ optimizationLevel: 4 }))
        .pipe(gulp.dest('dist/images'));
});


gulp.task('sass', function () {
    return gulp.src('./src/sass/main.scss')
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'expanded', }))
        .pipe(rename({ suffix: '.sass.min' }))
        // .pipe(minifyCss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css/'))
        .pipe(notify("Style Modifié"));
});


gulp.task('css', function () {
    return gulp.src('./src/css/*.css')
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(concat('app.css'))
        .pipe(rename({ suffix: '.min' }))
        // .pipe(minifyCss())
        // .pipe(uncss({
        //         html: ['*.html']
        //     }))
        .pipe(gulp.dest('dist/css/'))
        .pipe(notify("Style Modifié"));
});

//For js
gulp.task('js', function () {

    // validate JSON
    let validate = validator('./src/data/walkindead.json')
    if (!validate.errors) {
        notify("Aucune erreur JSON")
    } else {
        notify(JSON.stringify(validate.errors))
    }

    // Order By initi, filters, controllers...
    return gulp.src([ //ordre a respecter
        "src/app.js",
    ]).on('error', handleError)
        .pipe(jshint({
            esnext: true
        })).on('error', handleError)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        })) // débogage de mes pipes
        .pipe(jshint.reporter(stylish))
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js')) // repertoire distant
        .pipe(notify("Js Modifié")); // notification
});



// Images
gulp.task('images', function () {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(reload({ stream: true }))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({ message: 'Images compressées' }));
});


// Default task to be run with `gulp`
gulp.task('default', ['browser-sync', 'sass', 'css', 'js'], function () {
    gulp.watch("./src/sass/**/*.scss", ['sass']);
    // watch permet de regarder les changements de fichier et lancer les tâches que l'on souhaite
    gulp.watch("./src/css/**/*.css", ['css']);
    gulp.watch("./src/images/", ['images']);
    gulp.watch(["src/**/**/*.js", "src/**/*.js", "src/*.js"], ['js']);
    gulp.watch(["*.html"]).on('change', browserSync.reload); //reload on HTML

});