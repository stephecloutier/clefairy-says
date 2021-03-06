var gulp = require( "gulp" ),
    babel = require( "gulp-babel" ),
    rename = require( "gulp-rename" ),
    concat = require( "gulp-concat" ),
    addSrc = require( "gulp-add-src" ),
    fCompileExo;

// --- Task for js

gulp.task( "js", function() {
    gulp.src( [ "src/**/*.js" ] )
        .pipe( concat( "app.js" ) )
        .pipe( babel() )
        .on( "error", function( oError ) {
            console.error( oError );
            this.emit( "end" );
        } )
        .pipe( rename( function( path ) {
            path.basename += ".min";
        } ) )
        .pipe( gulp.dest( "bin" ) );
} );

// --- Watch tasks

gulp.task( "watch", function() {
    gulp.watch( "src/**/*.js", [ "js" ] );
} );

// --- Aliases

gulp.task( "default", [ "js" ] );
gulp.task( "work", [ "default", "watch" ] );
