const qr = require('qr-image');

exports.getQr=(req,res)=>{
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('Missing URL query parameter');
    }

    const qr_svg = qr.imageSync(url, { type: 'png' });
    // res.setHeader('Content-Disposition', 'attachment; filename="qr-code.png"');
    res.setHeader('Content-Disposition', `attachment; filename="qr-code-${url.replace(/[^a-zA-Z0-9]/g, '')}.png"`);
    res.type('png');
    res.send(qr_svg);
}