'use strict';

const selector = require('cheerio');

module.exports = rdf => {
    const $ = selector.load(rdf);
    const book = {};
    book.id =  parseInt($('pgterms\\:ebook').attr('rdf:about').replace('ebooks/',''),10);
    book.title = $("dcterms\\:title").text();
    book.authors = $("pgterms\\:agent pgterms\\:name")
        .toArray().map(element => $(element).text());
    book.subjects = $('[rdf\\:resource$="/LCSH"]')
        .parent().find('rdf\\:value')
        .toArray().map(elem => $(elem).text());
    book.lcc =  $('[rdf\\:resource$="/LCC"]')
        .parent().find('rdf\\:value').text();

    book.downloads =  $("pgterms\\:file").toArray().map(function(ele,index){
        return { link : $(ele).attr("rdf:about"), type: $(ele).find('[rdf\\:datatype$="/IMT"]').text()}
    });

    return book;
};