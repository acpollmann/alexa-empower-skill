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
const GET_FACT_MESSAGE = "Here's your inspirational quote: ";
const HELP_MESSAGE = 'You can say tell me empower me, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const CONTINUE_MESSAGE = 'Do you want to continue?';


//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/lambda/data
//=========================================================================================================================================
const data =
    [
    ['Tiffany Pham the founder of Mogul. ','Prioritization—figuring out which tasks will really move the needle the most—would be key. ',
        'I ask myself, Out of all the tasks I have right now, what is the one that would bring back the most? And thats what I do next. ',
        'Be confiedent and believe in yourself because if you believe then others will too','This confidence and belief will allow you to enable other women. ',
        'It’s about believing in your goals and what you are passionate about, and from that, others will become passionate about it too. '],
    ['Vanessa Hurst the co-founder of Girl Develop It and the CEO of CodeMontage. ', 'Feeling a little uncomfortable with your skills is a sign of learning and continuous '+
     'learning is what the tech industry thrives on! ', 'It’s important to seek out environments where you are supported, but where you have the chance to be uncomfortable and learn new things. '],
    ['Erin Teague, Director of Product of Yahoo. ' , 'Changing an industry and culture is extremely difficult. ', 'There is some progress, however, the change is not going to come quick. ',
    'Embrace your differences and if you need to prove yourself again and again. Never stop learning. ', 'Recognize and embrace your uniqueness. It does not have to be a disadvantage. ',
    'You are going to have a unique voice. It’s important to embrace that.'],
    ['Michelle Zatlyn, Co-Founder of CloudFlare. ', 'People do not take opportunities because the timing is bad, the financial side unsecure ',
    'Too many people are overanalyzing. Sometimes you just have to go for it. '],
    ['Angie Chang, VP of Strategic Partnerships at Hackbright Academy. ', 'Learn to ask for things. ', 'Be concise, relevant, and brave. '],
    ['Jess Lee, CEO of Polyvore. ', 'When I was interviewing at Google, one of my interviewers was Melissa Mayer, who told me to constantly challenge myself by going where I could grow the most. ',
    'Even if you do not succeed, at least you will have learned a lot. '],
    ['Megan Smith, CTO of the United States. ', 'If you can find something you are really passionate about, jump on that. ',
    'If you are passionate about something and you can bring your talent, you will be unstoppable. '],
    ['Grace Hopper, developer of the first compiler for a programming language', 'A ship in port is safe, but that is not what ships are for. ',
    'Sail out to sea and do new things. ']
    ];
    const factArr = data;
const factIndex = 0; //Math.floor(Math.random() * factArr.length);
let attribute = {"index":0, "inner":0};


//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    //alexa.dynamoDBTableName = 'IndexTable';
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const speechOutput = "Are you ready to be empowered?"
        this.response.speak(speechOutput);
        this.emit(':ask', speechOutput);

        //attribute['index'] = factIndex;
        //data[attribute['inner']] = 0;
        // const speechOutput = GET_FACT_MESSAGE + factArr[attribute['index']['inner']] + CONTINUE_MESSAGE;
        // this.response.cardRenderer(SKILL_NAME, speechOutput);
        // // this.response.speak(speechOutput);
        // console.log('this keys are ' + Object.keys(this));

        // //factIndex++;
        // //sessionAttributes['index'] += 1;
        // //console.log("this is the attribute for index" + this.attributes.index);
        // //console.log(sessionAttributes);
        // attribute['index'] += 1;
        // this.emit(':ask', speechOutput);
    },
    'AMAZON.YesIntent': function () {
        // const speechOutput = GET_FACT_MESSAGE + data[attribute['index']][attribute['inner']] + CONTINUE_MESSAGE;
        // this.response.cardRenderer(SKILL_NAME, speechOutput);
        // attribute['index']++;
        // attribute['inner']++;
        // this.response.speak(speechOutput);
        console.log('this keys are ' + Object.keys(this));
        if (attribute['inner'] === data[attribute['index']].length  ) {
             const speechOutput = 'Now it is your chance to empower the world.';
             attribute['index'] += 1;
             if (attribute['index'] === data.length) {
                 attribute['index'] = 0;
             }
             attribute['inner'] = 0;
             this.emit(':tell', speechOutput);
        } else if (attribute['inner'] === data[attribute['index']].length-1) {
            const speechOutput = data[attribute['index']][attribute['inner']];
            //attribute['index']+=1;
            attribute['inner']+=1;
            console.log(data[attribute['index']][attribute['inner']]);
            this.emit(':ask', speechOutput);
        } else {
             const speechOutput = data[attribute['index']][attribute['inner']] + CONTINUE_MESSAGE;
            attribute['inner']+=1;
             this.emit(':ask', speechOutput);
            //attribute['index']+=1;


        }

        //factIndex++;
        //sessionAttributes['index'] += 1;
        //console.log("this is the attribute for index" + this.attributes.index);
        //console.log(sessionAttributes);

        // attribute['index'] += 1;
        // this.emit(':ask', speechOutput);
        // if (attribute['index'] === data.length-1) {
        //     const speechOutput = 'Now it is your chance to empower the world.';
        //     this.emit(':tell', speechOutput);
        // } else if  (attribute['index'] === data.length-2) {
        //     const speechOutput = data[attribute['index']];
        //     this.emit(':ask', speechOutput);
        //     attribute['index']+=1;
        // } else {
        //      const speechOutput = data[attribute['index']] + CONTINUE_MESSAGE;
        //      this.emit(':ask', speechOutput);
        //      attribute['index']+=1;
        // }
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
