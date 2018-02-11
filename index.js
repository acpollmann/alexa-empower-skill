/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'Empower Women';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/lambda/data
//=========================================================================================================================================
const data = [
    'Tiffany Pham the founder of Mogul. Obstacle:  prioritization—figuring out which tasks will really move the needle the '
    +'most—would be key. [I ask] myself, Out of all the tasks I have right now, what is the one that would bring back the most? And thats what I do next.',
    'Vanessa Hurst the co founder of Girl Develop It and the CEO of CodeMontage. Obstacle: She struggled with the desire to want to make a diference now.'
    +'When she joined Capital IQ she was learning more about production and ownership so she questioned her qualifications as a biomedical engineer turned developer. ',
    'Erin Teague, Director of Product of Yahoo. Obstacle: Change an industry and culture is extremely difficult. There is some progress, however the change is not going to'
    + 'come quick. Embrace your differences and if you need to prove yourself again and again. Mever stop learning',
    'Michelle Zatlyn, Co-Founder of CloudFlare. Obstacle: '
    //First Quote
    //'Tiffany Pham, Founder of Mogul: When I look back to my younger self, I would tell myself to be'+
    //' confident first and foremost, to believe in myself, before anyone else because if I believe in myself,'
    //+' then others will too. And ultimately, this confidence and belief in myself would enable me to enable'
    //+'other women around the world. It’s about believing in your goals and what you are passionate about, and from that, others will become passionate about it too.'

    //Second quote
    //' Vanessa Hurst, Co-Founder of Girl Develop It and CEO of Code Montage, Feeling a little uncomfortable with your skills is a sign of learning, and continuous'+
    //'learning is what the tech industry thrives on! It’s important to seek out environments where you are supported, but where you have the chance to be uncomfortable and learn new things.'

    //Third quote
    //'Erin Teague, Director of Product of Yahoo, Recognize and embrace your uniqueness. I don’t think the ratios are going to change anytime soon. But, I don’t think it'
    //+' has to be a disadvantage. Being a Black woman, being a woman in general, on a team of all men, means that you are going to have a unique voice. It’s important to embrace that.'

    //Fourth quote
    //'Michelle Zatlyn, Co-Founder of CloudFlare, people don’t take opportunities because the timing is bad, the financial side unsecure. Too many people are overanalyzing. Sometimes you just have to go for it'
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();

};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact + "Do you want to continue?";

        this.response.cardRenderer(SKILL_NAME, randomFact);
        // this.response.speak(speechOutput);
        console.log('this keys are ' + Object.keys(this));
        this.emit(':ask', speechOutput);
    },
    'AMAZON.YesIntent': function () {
        const speechOutput = "Access array. Do you want to continue?";
        this.emit(':ask', speechOutput);
    },
    'AMAZON.NoIntent': function () {
        const speechOutput = 'Goodbye';
        this.emit(':tell', speechOutput);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};
