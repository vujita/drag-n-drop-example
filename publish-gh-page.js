/**
 * Created by vnguyen on 8/24/16.
 */
var path = require('path'),
    fs = require('fs'),
    ghPages = require('gh-pages'),
    distFolder = 'dist';

//Anything we need to move over
copyFilesToDist(['README.md']);

//Publish dist folder to gh-pages branch
ghPages.publish(path.join(__dirname, distFolder), function (err) {
    if (err) {
        console.log('publish error occurred', err);
    } else {
        console.log('publish sucessful');
    }
});

function copyFilesToDist(files) {
    files.forEach(function (f) {
        console.log('coping file', f, ' over to dist');
        var contents = fs.readFileSync(f).toString();
        fs.writeFileSync(distFolder + '/' + f, contents);
    });
}