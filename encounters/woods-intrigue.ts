import { Beat } from '../types';

export var woodsIntrigue: Record<string, Beat> = {
  gooseGnomeStandoff: {
    id: 'gooseGnomeStandoff',
    img: 'media/geesevgnomes.png',
    imgAlt: 'A bunch of geese, a bunch of gnomes, a bunch of bad vibes',
    desc: `<p>Walking through the woods at night, as a goth druid is wont to do, you come across an unusual commotion.</p>
<p>A group of geese and a group of gnomes are yelling at each other and taking threatening postures. It seems as though a large brown spike between them is at the center of the dispute.</p>
<p>As you approach, they turn to you.</p>
<p>"Foul goose! How dare you dig up my spike?!" cries a gnome in a red hat. "Yeah, leave Ewmis's spike alone!" adds the gnome in the green hat. "Why were you spiking, anyway, Ewmis?" inquires the third gnome, who is ignored.</p>
<p>"HONK!" honk the geese, as they flap furiously.</p>
`,
    question: 'Tensions are high. They all look at you expectantly.',
    playerOptions: {
      choices: [
        {
          id: 'giveToGnomes',
          desc:
            'Pick up the spike and hand it to the gnome Ewmis, risking a fight with the geese. "You are the rightful spike holder."',
          oneTime: true,
          condition({ state }) {
            return !state.spikeOwner && !state.gnomesLeft;
          },
          next({ state, probable }) {
            var resolutionText =
              '"I knew forest justice would be served", Ewmis says as he takes the spike. The gnomes disappear into the night.';
            state.spikeOwner = 'ewmis';
            state.gnomesLeft = true;

            if (probable.rollDie(20) <= state.cha - 3) {
              resolutionText += ' The geese grouse a bit.';
            } else {
              const gooseDmg = probable.rollDie(6);
              state.hp -= gooseDmg;
              resolutionText += `<p>The geese furiously peck at you for <strong>${gooseDmg} damage</strong> before flying off, leaving you with ${state.hp} hp!</p>`;
              state.geeseLeft = true;
            }

            return {
              beatId: 'gooseGnomeStandoff',
              resolutionText
            };
          }
        },
        {
          id: 'giveToGeese',
          desc:
            'Pick up the spike and give it to the geese, risking a fight with the gnomes. "You are right to protect the earth from this spike. Here is your reward."',
          oneTime: true,
          condition({ state }) {
            return !state.spikeOwner && !state.geeseLeft;
          },
          next({ state, probable }) {
            state.spikeOwner = 'goose';
            state.geeseLeft = true;

            var resolutionText =
              '"HONK!" The geese flap righteously and carry the spike off into the skies.';

            if (probable.rollDie(20) <= state.cha - 5) {
              resolutionText += `
<p>The red-hatted gnome stares in shock for a moment. His comrades pull him away. "C'mon, Ewmis. We can get another spike back in town. Besides, we weren't actually going to camp here another night, anyway."</p>`;
            } else {
              let result = runGnomeBattle(state, probable);
              resolutionText += result.resolutionText;
            }

            resolutionText += '</p>';

            return {
              beatId: 'gooseGnomeStandoff',
              resolutionText
            };
          }
        },
        {
          id: 'takeSpike',
          desc:
            'Risk a fight with both parties and take the spike for yourself.',
          condition({ state }) {
            return !state.spikeOwner && (!state.geeseLeft || !state.gnomesLeft);
          },
          next({ state, probable }) {
            var resolutionText =
              'Both the gnomes and geese stare at you in shock.';
            state.spikeOwner = 'pc';

            const chaCheckRoll = probable.rollDie(20);
            if (chaCheckRoll <= state.cha - 5) {
              resolutionText +=
                ' But as agitated as they are, they seem to respect your authority in this matter and just watch quietly as you take possession of the spike.';
            } else if (chaCheckRoll <= state.cha - 3) {
              resolutionText +=
                ' The geese back off as you quietly take possession of the spike, but the gnomes take up arms.';
              let result = runGnomeBattle(state, probable);
              resolutionText += result.resolutionText;
            } else {
              resolutionText +=
                ' All parties are not OK with that! The gnomes take up arms, and the geese fly at you!';
              const battleWonUnscathed: boolean =
                probable.rollDie(20) <= state.str - 1;
              if (battleWonUnscathed) {
                resolutionText +=
                  ' However, you are the superior combatant today. You kill the gnomes and scatter the geese before they can land a sword or beak on you.';
              } else {
                const dmg =
                  probable.rollDie(6) +
                  probable.rollDie(6) +
                  probable.rollDie(6);
                state.hp -= dmg;
                resolutionText += ` You manage to kill the gnomes and chase off the geese, but not without taking wounds amounting to <strong>${dmg} damage</strong>, leaving you with ${state.hp} hp!`;
                state.gnomesLeft = true;
                state.geeseLeft = true;
              }
            }

            return { resolutionText, beatId: 'gooseGnomeStandoff' };
          }
        },
        {
          id: 'askGnomeAboutSpike',
          desc: 'Ask the gnome what he was doing with the spike.',
          condition({ state }) {
            return !state.gnomesLeft;
          },
          next({ state }) {
            var resolutionText;
            if (state.ewmisCharmed) {
              resolutionText = `<p>Ewmis grins. "Glad you asked! Well, I just joined this new group called OmniMud. They're really going to change things around here, I think! Right now, no one in one part of the woods knows anything about things going on in other parts of the woods or in the Temple, right?</p>
<p>Well, when you join OmniMud, you do get to know. For example, I found out that Olonka takes the herbs we gather over to Nulb and sells them to crones for twenty times what she pays us.</p>
<p>"All I have to do is take a spike from Ourtram, my new life coach over at OmniMud, and then bury them over by the boulder on the pond each week."</p>
<p>This all looks like news to the other gnomes. The gnome in the blue hat protests, "But what about finding good spots for the tent?"</p>
<p>"Well, I wasn't sure if you were ready for the OmniMud Way yet, so that was what we call a 'Truth Primer.'"</p>`;
              state.ewmisRevealedOmniMud = true;
              state.boulderOnPondKnown = true;
            } else {
              resolutionText =
                '<p>"Well, I couldn\'t sleep, and I was just trying to find a good site for our tents for tomorrow," replies the gnome Ewmis.</p><p>The gnome in the blue hat seems nonplussed.</p>';
            }
            return {
              beatId: 'gooseGnomeStandoff',
              resolutionText
            };
          }
        },
        {
          id: 'speakWithGeese',
          desc:
            'Cast Speak with Animals, then ask the geese why they want the spike.',
          oneTime: true,
          condition({ state }) {
            return !state.geeseLeft;
          },
          next() {
            return {
              beatId: 'gooseGnomeStandoff',
              resolutionText: `<em>You cast the spell, and the honks become imbued with meaning.</em>
<p>"We found this nervous gnome! He had a thing! We took its thing!" honks one goose.</p>
<p>"Yeah!" honks another goose.</p>
<p>"HELLS YEAH!" honks the third goose.</p>`
            };
          }
        },
        {
          id: 'charmGnome',
          desc:
            'Cast Charm Person or Mammal on the gnome Ewmis (he gets a save and will notice you casting).',
          oneTime: true,
          condition({ state }) {
            return !state.gnomesLeft;
          },
          next({ probable, state }) {
            const ewmisMadeSave = probable.roll(20) >= 16;
            var resolutionText;

            if (ewmisMadeSave) {
              state.ewmisNoticedSpellCasting = true;
              resolutionText =
                "The gnomes' brows furrow with suspicion. They whisper to each other. The geese honk.";
            } else {
              state.ewmisCharmed = true;
              resolutionText =
                "The gnomes' brows furrow with suspicion, except for Ewmis who relaxes and smiles for the first time you've seen. The geese honk.";
            }
            return {
              beatId: 'gooseGnomeStandoff',
              resolutionText
            };
          }
        }
        // TODO: examineSpike, go somewhere else choices.
      ]
    }
  },
  end: {
    id: 'end',
    desc: 'You go back to sleep. The end.'
  },
  scouting: {
    id: 'scouting',
    desc: `"We've seen that the Temple is a popular destination for high income individuals! At the same time, the supply of convenience &mdash; and luxury &mdash; goods is low," Fred explains.
<p>Joe continues "Now, Mogredh, you and your team have spent considerable time scouting the Temple. We're very excited about the unique perspective you have as a Temple SME with a background at Item Mart as a 
<em>[glances at paper]</em>
Service Associate I."</p>
<p>"We're going to put a feeler out into this market by running a kiosk for a week!</p>`,
    question:
      '"As an expert on the Temple and convenience markets, where do you think we should set up our kiosk in order to optimize for both traffic and safety?"',
    playerOptions: {
      choices: [
        {
          id: 'outsideKiosk',
          desc: 'Close to the Temple, but not inside of it.',
          next() {
            return { beatId: 'stock' };
          }
        },
        {
          id: 'firstFloorKiosk',
          desc: 'In the grand hall on the ground floor.',
          next() {
            return { beatId: 'stock' };
          }
        },
        {
          id: 'dungeonLevel1Kiosk',
          desc: 'The first underground level of the Temple.',
          next() {
            return { beatId: 'stock' };
          }
        }
      ]
    }
  },
  stock: {
    id: 'stock',
    desc: `"We have a budget of 300 gp for this venture. We'd love to get your opinion on spend prioritization!"
    <p>Fred holds unrolls the budget scroll, which reads as follows:</p>
<ul>
  <li>Climbing supply box (ropes, spikes, grappling hooks): 20 gp</li>
  <li>Lighting box (lanterns, torches, oil, tinder kits): 10 gp</li>
  <li>Ammo box (flight arrows, quarrels, and darts): 10 gp</li>
  <li>Potion of Healing: 200 gp (retail for 300 gp)</li>
  <li>Worg Juice keg: 50 gp</li>
  <li>Dry rations (100) box: 50 gp</li>
  <li>Fully closeable and lockable kiosk upgrade: 100 gp</li>
  <li>Guard: 30 gp each</li>
  <li>Cleric: 225 gp</li>
  <li>Elite guard: 150 gp</li>
</ul>`,
    question: 'How should we budget this?',
    playerOptions: {
      freeText: {
        id: 'kioskBudget',
        hint: 'Write your budget recommendation here.',
        next() {
          return { beatId: 'consignment' };
        }
      }
    }
  },
  consignment: {
    id: 'consignment',
    desc: '"BTW, we have a consignment slot open at the kiosk!"',
    question: '"Is there anything you\'d like to sell? Item Mart takes 20%."',
    playerOptions: {
      freeText: {
        id: 'consignmentItem',
        hint:
          "Write down what you'd like to give to them to sell and at what price.",
        next() {
          return { beatId: 'analystGoodbye' };
        }
      }
    }
  },
  analystGoodbye: {
    id: 'analystGoodbye',
    desc: `"It was a pleasure working with you, Mogredh. We'll let you know how things pan out with the kiosk. And if things don't work out with the "adventuring", there may be an opportunity for you in Management in this region very soon [wink]!"
<p>With that, Fred and Joe roll up their papers and head out with an optimistic swagger.</p>`,
    endOfEncounter: true
  },
  sulk: {
    id: 'sulk',
    desc:
      "You shut the door and go back to sulking. It's a good sulk. The end.",
    endOfEncounter: true
  }
};

// Modifies state.
function runGnomeBattle(state, probable) {
  var resolutionText =
    '<p>Ewmis flies into a rage and attacks you, and his comrades back him up!';

  const battleWonUnscathed: boolean = probable.rollDie(20) <= state.str;
  if (battleWonUnscathed) {
    resolutionText +=
      ' However, you are the superior combatant today. You kill them before they can land a sword on you.';
  } else {
    const gnomeDmg = probable.rollDie(6) + probable.rollDie(6);
    state.hp -= gnomeDmg;
    resolutionText += ` You manage to kill them, but not without taking wounds amounting to <strong>${gnomeDmg} damage</strong>, leaving you with ${state.hp} hp!`;
    state.gnomesLeft = true;
  }

  return { resolutionText };
}
