const Apify = require('apify');
const Languages = require('languages.io');

Apify.main(async () => {

    const { textObject } = await Apify.getInput();
    const language = new Languages();

    async function detectLanguage(text) {
        let detection = language.recognize(text);
        return detection;
    }
    let results = [];
    for (const item in textObject) {
        const result = await detectLanguage(textObject[item]);
        const name = result.name;
        const accuracy = result.accuracy;
        console.log('–––––––––––––––––––––––––––––––––––––––––––');
        console.log(`text: ${textObject[item]}`);
        console.log(`language provided: ${item}`);
        console.log(`language detected: ${name}`);
        console.log(`detection accuracy: ${accuracy}`);

        let temp = { "text": textObject[item], ...result }
        results.push(temp)
    }

    await Apify.pushData(results);

});
