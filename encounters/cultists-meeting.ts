import { Beat } from '../types';

export var cultistsMeeting: Record<string, Beat> = {
  discussion: {
    id: 'discussion',
    img: 'media/cultists.jpg',
    imgAlt: 'A picture of three guys',
    desc:
      '<p>Three people in robes sit at the next table in the common room. They are having a heated discussion but are straining to keep it quiet, only partially sucessfully.</p>',
    question: 'What do you do?',
    playerOptions: {
      choices: [
        {
          id: 'spy',
          desc: 'Eavesdrop without being noticed (DEX check with +3 bonus)',
          next({ probable }) {
            const check = probable.rollDie(20);
            var resolutionText = `[DEX check: ${check}]`;
            var nextBeatId = 'introductions';
            if (check <= 8 + 3) {
              resolutionText += " They don't seem to notice you.";
              nextBeatId = 'waitingFor';
            } else {
              resolutionText += ' One of the robed people turns to you.';
            }
            return { beatId: nextBeatId, resolutionText };
          }
        },
        {
          id: 'introduce',
          desc: 'Introduce yourself.',
          next() {
            return { beatId: 'introductions' };
          }
        }
      ]
    }
  },
  introductions: {
    id: 'introductions',
    desc:
      'A robed halfing nods at you. "I am Shillana. These are my spiritual siblings, Alabie Ella, and Isry. We live to spread the cleansing truth of fire!" Who might you be?"<br>',
    question: 'How do you introduce yourself?',
    playerOptions: {
      freeText: {
        id: 'introName',
        hint: 'Your name here',
        next({ freeText }) {
          var resolutionText = '"Good to meet you."';
          var nextBeatId = 'recruitment';
          if (
            freeText.value
              .toLowerCase()
              .trim()
              .includes('unaanne')
          ) {
            nextBeatId = 'cadre';
            resolutionText = '"Unaanne! Finally! We have much to talk about!';
          }
          return { beatId: nextBeatId, resolutionText };
        }
      }
    }
  },
  waitingFor: {
    id: 'waitingFor',
    desc: `A robed halfling pounds the table. "Stop this! This is needless. This will all be settled in a few moments when the agent from the Plane arrives. What was her name again?"
<p>"Unaanne. That is the name she takes in mortal form," replies a robed human.</p><p>"Yes, Unaanne will tell us when the new leadership cadre will arrive."</p><p>They all fall silent.</p>`,
    question: 'What do you do next?',
    playerOptions: {
      choices: [
        {
          id: 'introduce',
          desc: 'Introduce yourself.',
          next() {
            return { beatId: 'introductions' };
          }
        },
        {
          id: 'leaveRoom',
          desc: 'Leave the common room.',
          next() {
            return {
              encounterId: 'itemMartAnalysts',
              beatId: 'doorKnock',
              resolutionText: 'You leave and go back to your room.'
            };
          }
        }
      ]
    }
  },
  recruitment: {
    id: 'recruitment',
    desc: `"I tell you my friend. There will be judgment for us all and fire for us all. But! That fire can good! It can be your greatest friend!"
<p>Another robed person chimes in. "Indeed. And water, earth, air, these are the filthy elements. The ones that are impure. We wage war against them!"</p>
<p>The third robee speaks. "You may have heard that the forces of fire have been dealt a blow. That much is true. But that is a minor dip in our flame. We are rekindling! We are burning sacrifices in the Temple in a few days hence! Have you a sacrifice that you would like us to burn? It will strengthen your soul as it does the forces of Fire!"`,
    question: 'What, if anything, do give them?',
    playerOptions: {
      freeText: {
        id: 'fireSacrifice',
        hint: "Write (or don't) an item you want to give them here.",
        next({ freeText }) {
          var resolutionText = '';
          if (freeText.value.trim().length > 0) {
            resolutionText += '"Thank you. Fire cleanse your soul!" ';
          }
          resolutionText +=
            'The cultists soon leave. You leave and go back to your room.';

          return {
            encounterId: 'itemMartAnalysts',
            beatId: 'doorKnock',
            resolutionText
          };
        }
      }
    }
  },
  cadre: {
    id: 'cadre',
    desc: `"Unaane, we beseech you! We have been lost since the Water fiends destroyed our leaders. We suspect the trolls helped them," says the robed halfling.
<p>The robed human adds, "And yet more 'heroes' are poking around the Temple. The latest horde may have actually killed Falrinth and Smigal. It's a matter of time until they encroach on our territory. We must destroy them soon!"</p>
<p>"Where is the new leadership cadre of which we have been foretold? How can we find them?"</p>`,
    question: 'What do you tell them?',
    playerOptions: {
      freeText: {
        id: 'advice',
        hint: 'Write your prophecy/advice/poems here.',
        next() {
          var resolutionText =
            'We will meditate on this! Fire cleanse your soul!<p>They get up and leave, and you head back to your room.';
          return {
            encounterId: 'itemMartAnalysts',
            beatId: 'doorKnock',
            resolutionText
          };
        }
      }
    }
  }
};
