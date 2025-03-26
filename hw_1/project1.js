// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite( bgImg, fgImg, fgOpac, fgPos )
{
    //fgPos = {x:0, y:0};
    //fgOpac = 1;
    
    for (var y = 0; y < fgImg.height; ++y){
        if (y + fgPos.y < 0 || y + fgPos.y >= bgImg.height) continue;

        for (var x = 0; x < fgImg.width; ++x){

            const fgIdx = (y * fgImg.width + x) * 4;
            if (x + fgPos.x < 0 || x + fgPos.x >= bgImg.width) continue;

            const bgIdx = ((y + fgPos.y) * bgImg.width + x + fgPos.x) * 4;
            const alpha = fgImg.data[fgIdx + 3]*fgOpac / 255;
            const finalAlpha =  alpha + ( 1 - alpha ) * bgImg.data[bgIdx + 3] / 255;

            for (var i = 0; i < 3; ++i){
                bgImg.data[bgIdx + i] = (( 1 - alpha ) * bgImg.data[bgIdx + i] * bgImg.data[bgIdx + 3] / 255 + alpha * fgImg.data[fgIdx + i]) / finalAlpha;
            }
            bgImg.data[bgIdx + i] = finalAlpha*255;
        }
    }
}