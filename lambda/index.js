/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const SKILL_NAME = 'Dad Jokes';
const STOP_MESSAGE = 'Thanks for stopping by. Have a good day';
const MORE_MESSAGE = 'What would you like to do next?'
const PAUSE = '<break time="0.6s" />'
const WHISPER = '<amazon:effect name="whispered" />'
const PUN_MAX = 24;      //current number of pun jokes.
const BRICK_MAX = 8;    //current number of brick jokes. 
const CS_MAX = 14;
'’'

const puns = [
    '"What do you call a factory that makes okay products?" "A satisfactory."',
    '"What did the janitor say when he jumped out of the closet?" "Supplies!"',
    '"Have you heard about the chocolate record player? It sounds pretty sweet."', 
    '"What did the ocean say to the beach?" "Nothing, it just waved."', 
    '"Why do seagulls fly over the ocean?" "Because if they flew over the bay, we would call them bagels."',
    '"I only know 25 letters of the alphabet. I dont know y."',
    '"What did one wall say to the other?" "I’ll meet you at the corner."', 
    '"A skeleton walks into a bar and says, Hey, bartender. I’ll have one beer and a mop."',
    '"Where do fruits go on vacation?" "Pear-is!"', 
    '"I asked my dog whats two minus two. He said nothing."', 
    '"I dont trust those trees. They seem kind of shady."', 
    '"My wife is really mad at the fact that I have no sense of direction. So I packed up my stuff and right!"',
    '"How do you make 7 even?" "Take away the s."',
    '"How does a taco say grace?" "Lettuce pray."',
    '"Why did the math book look so sad? Because of all of its problems!"',
    '"Do you wanna box for your leftovers?" "No, but Ill wrestle you for them."',
    '"If a child refuses to nap, are they guilty of resisting a rest?"',
    '"I ordered a chicken and an egg from Amazon. Ill let you know..."',
    '"I once had a dream I was floating in an ocean of orange soda. It was more of a fanta sea."',
    '"I once got fired from a canned juice company. Apparently I couldnt concentrate."',
    '"I’m on a seafood diet. I see food and I eat it."',
    '"I used to be a personal trainer. Then I gave my too weak notice."',
    '"Did I tell you the time I fell in love during a backflip? I was heels over head!"',
    '"How do lawyers say goodbye? We’ll be suing ya!"',
    ]
    
    
const brick_jokes = [
    'I was pondering why people keep telling me that juggling bricks is a bad idea. Then it hit me.', 
    'Which is heavier, 200 lbs of feathers, or 200 lbs of bricks? The feathers, because you also have to carry the weight of what you did to those poor birds',
    'Why did the chicken cross the yellow brick road? Because he was looking for courage.',
    'Someone threw part of a brick through my front window. The police couldn’t do anything though. They said there wasnt enough concrete evidence',
    'First thing every morning I punch a brick wall as hard as I can. Because your best days start with break fist.', 
    'I dont want to sound like I’m showing off or something, but people put bricks through my windows. Just so they can hear me practicing my saxophone louder.',
    'A truck load of Lego Bricks has overturned on the highway. Police say they dont know what to make of it.',
    'A truck has spilled its cargo of brick all over the road. Polic say queues are building.',
    ]
    
    
const CS_jokes = [
    '"I asked my friend for some pointers on the homework. He said 0x3A2813A..."', 
    '"My dog ate my coding assignment. It took him a couple of bytes"',
    '"I dont like computer science jokes. Not one bit".',
    '"One thing I know is that a computer science major didnt name the original pokemon.Otherwise, charmander would evolve into stringmander."',
    '"I would talk about computer science but it makes my mother board."',
    '"A computer science teacher asks the class to turn to page 404. The students search feverishly, to no avail"',
    '"Whats the object oriented way to become wealthy? Inheritance."',
    '"What do you call a programmer from Finland? Nerdic."',
    '"What is a programmers favorite hangout place? Foo Bar."',
    '"Why did the programmer quit their job? Because they didnt get arrays"',
    '"Chuck Norris writes code that optimizes itself"',
    'Software developers like to solve problems. If there are no problems available, they will create their own problems."',
    'A foo walks into a bar, takes a look around and says "Hello World!"',
    'A programmer had a problem. He decided to use Java. Now he has a ProblemFactory."',
    ]

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        //const speakOutput = 'Welcome, you can say Hello or Help. Which would you like to try?';
          const speakOutput = 'Welcome to dad jokes. You can say "give me a dad joke" to get started or say "help" to get more information.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const GetJokeHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'   //grab joke intent. 
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'joke';
    },
    handle(handlerInput) {
        let joke_type = handlerInput.requestEnvelope.request.intent.slots.type.value;   //get type of joke. 
        //const speakOutput = 'Welcome, you can say Hello or Help. Which would you like to try?';
        let speakOutput = '';   //default output to empty.
        let index = 0;  //default index to 0. 
          
        if (joke_type === 'pun' || joke_type === 'punny' || joke_type === 'dad'){
            index = getrandomnumber(PUN_MAX);   //get random pun index.
            speakOutput = puns[index] + PAUSE;
        }
        else if(joke_type === 'brick joke'){
            index = getrandomnumber(BRICK_MAX); //get random brick index. 
            speakOutput = brick_jokes[index] + PAUSE;
        }
        else if(joke_type === 'computer science'){
            index = getrandomnumber(CS_MAX);    //get random CS index. 
            speakOutput = CS_jokes[index] + PAUSE;
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say "give me a pun joke", "tell me a brick joke", or "give me a good dad joke". ';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


function getrandomnumber(MAX){
    return Math.floor(Math.random() * (MAX - 0) + 0);   //get a random whole number between 0 and MAX. 
}
/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GetJokeHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();