'use strict';

let testPage = {

    linkAbout: 'a[href*="about.google"]',
    header: '.header'

};

testPage.linkOurProducts = `${testPage.header} a[class*="link-products"]`;

module.exports = testPage;