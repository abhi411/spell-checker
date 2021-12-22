var nspell = require('nspell')

function getDic(lang) {
// var dictionary = require('dictionary-en')
    
}

module.exports.checkSpell = function(arr,lang) {
    return new Promise(resolve => {
        if(lang == 'dictionary-ca')
        var dictionary = require('dictionary-ca')
        else if(lang == 'dictionary-da')
        var dictionary = require('dictionary-da')
        else if(lang == 'dictionary-de')
        var dictionary = require('dictionary-de')
        else if(lang == 'dictionary-es')
        var dictionary = require('dictionary-es')
        else if(lang == 'dictionary-fr')
        var dictionary = require('dictionary-fr')
        else if(lang == 'dictionary-it')
        var dictionary = require('dictionary-it')
        else if(lang == 'dictionary-nl')
        var dictionary = require('dictionary-nl')
        else if(lang == 'dictionary-pl')
        var dictionary = require('dictionary-pl')
        else if(lang == 'dictionary-pt')
        var dictionary = require('dictionary-pt')
        else if(lang == 'dictionary-sv')
        var dictionary = require('dictionary-sv')
        else 
        var dictionary = require('dictionary-en')

        console.log("jhjhj")
        dictionary(ondictionary)
        function ondictionary(err, dict) {
        console.log("spewll");
        if (err) {
            console.log(err,"err");
            throw err
        }
        var spell = nspell(dict)
        console.log("spewll");

        console.log(spell.correct('colour')) // => false
        let resp = "<p>"
        arr.forEach((element,index) => {
        console.log("ele",element);
            if(index != 0)
                resp = resp + " "
            if(spell.correct(element)){
                resp = resp+element
            }
            else {
                resp = resp + `<span style="color:red">${element}</span>`
            }
        });
        resolve(resp+'</p>')
    }
    }) 

}