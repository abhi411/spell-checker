var nspell = require('nspell')

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

        dictionary(ondictionary)
        function ondictionary(err, dict) {

        if (err) {
            console.log(err,"err");
            throw err
        }
        var spell = nspell(dict)

        let resp = `<div">`
        arr.forEach((line,index) => {
           line.split(" ").map((word, j) => {
            word = word.trim()
            //    if(index != 0)
            //        resp = resp + " "
               if(spell.correct(word)){
                   resp = resp+`<span>${word}</span>`
               }
               else {
                   let sug=spell.suggest(word)
                   if(sug && sug.length>0) {
                       let list=''
                       sug.forEach((suggWord) =>{
                           list+= `<li><a onclick="return applySuggestions(this);" href="Javascript:void(0)">${suggWord}</a></li>`
                       })
                       resp = resp + `<div class="dropdown" style="display: inline-block;">
                       <span style="color:red" class="dropdown-toggle" type="button" data-toggle="dropdown">${word}
                       </span>
                       <ul class="dropdown-menu">
                        ${list}
                       </ul>
                     </div>`
                   }
                   else{
                       resp = resp + `<span title="No Suggestion Available" style="color:red">${word}</span>`
                   }
               }
               // if not last iteration
               if(j != line.split(" ").length - 1) resp += `&nbsp;`
           })
           if(arr.length > 1) resp += `<br>`
        });
        resolve(resp+'</div>')
    }
    }) 

}