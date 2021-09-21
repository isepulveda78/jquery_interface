const  {src, dest, series, parallel, watch} = require('gulp')
const browserSync = require('browser-sync').create()

const del = require('del')
const origin = 'src'
const destination = 'build'

const concatenate = require('gulp-concat')


//del deletes the build folder
async function clean(cb){
    await del(destination)
    cb()
}

function html(cb){
    src(`${origin}/**/*.html`).pipe(dest(`${destination}`))
    .pipe(dest(`${destination}`))
    cb()
}

//Moves css files to a build folder
function css(cb){
    src(`${origin}/css/**/*.css`).pipe(dest(`${destination}/css`))
    .pipe(dest(`${destination}/css`))
    cb()
}
//Moves js files to a build folder
function js(cb){
    src(`${origin}/js/*.js`)
    .pipe(concatenate('script.js'))
    .pipe(dest(`${destination}/js`))
    cb()
}
function watcher(cb){
    watch(`${origin}/**/*.html`).on('change', series(html, browserSync.reload))
    watch(`${origin}/**/*.css`).on('change', series(css, browserSync.reload))
    watch(`${origin}/**/*.js`).on('change', series(js, browserSync.reload))
    cb()
}

function server(cb){
    browserSync.init({
        notify: false, //stops from showing the browsersync tab that's on the upper right side
        open: true, //stops from opening a new tab
        server: {
            baseDir: destination
        }
    })
    cb()
}

exports.default = series(parallel(html, css, js), server, watcher)