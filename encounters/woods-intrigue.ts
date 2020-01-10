import { Beat, NextResult } from '../types';

export var woodsIntrigue: Record<string, Beat> = {
  gooseGnomeStandoff: {
    id: 'gooseGnomeStandoff',
    img: 'media/geesevgnomes.png',
    imgAlt: 'A bunch of geese, a bunch of gnomes, a bunch of bad vibes',
    desc: `<p>Walking through the woods at night, as a goth druid is wont to do, you come across an unusual commotion.</p>
<p>A group of geese and a group of gnomes are yelling at each other and taking threatening postures. It seems as though a large brown spike between them is at the center of the dispute.</p>
<p>As you approach, they turn to you.</p>
<p>"Good warden of the woods! This foul goose dug up my spike and won't leave it be!" cries a gnome in a red hat. "Yeah, Ewmis was just doing some spiking, then he hollered because these geese beset him!" adds the gnome in the green hat. "Why were you spiking, anyway, Ewmis?" inquires the third gnome, who is ignored.</p>
<p>"HONK!" honk the geese, as they flap furiously.</p>
`,
    question: 'They all look at you expectantly.',
    playerOptions: {
      choices: [
        {
          id: 'giveToGnomes',
          desc:
            'Pick up the spike and hand it to the gnome Ewmis. "You are the rightful spike holder."',
          next({ state }) {
            state.spikeOwner = 'ewmis';
            // TODO: Resolution text
            return { beatId: 'sulk' };
          }
        },
        {
          id: 'giveToGeese',
          desc:
            'Pick up the spike and give it to the geese. "You are right to protect the earth from this spike. Here is your reward."',
          next({ state }) {
            state.spikeOwner = 'goose';
            // TODO: Resolution text
            return {
              beatId: 'sulk',
              resolutionText: `"HONK!" The geese flap righteously and carry the spike off into the skies.
<p>The red-hatted gnome stares in shock for a moment. His comrades pull him away. "C'mon, Ewmis. We can get another spike back in town. Besides, we weren't actually going to camp here another night, anyway."</p>`
            };
          }
        },
        {
          id: 'askGnomeAboutSpike',
          desc: 'Ask the gnome what he was doing with the spike.',
          oneTime: true,
          next() {
            return {
              beatId: 'gooseGnomeStandoff',
              resolutionText:
                '<p>"Well, I couldn\'t sleep, and I was just trying to find a good site for our tents for tomorrow," replies the gnome Ewmis.</p><p>The gnome in the blue hat seems nonplussed.</p>'
            };
          }
        },
        {
          id: 'speakWithGeese',
          desc:
            'Cast Speak with Animals, then ask the geese why they want the spike.',
          oneTime: true,
          next() {
            return {
              beatId: 'gooseGnomeStandoff',
              resolutionText: `<em>You cast the spell, and the honks become imbued with meaning.</em>
<p>"We found this nervous gnome! He had a thing! We took its thing!" honks one goose.</p>
<p>"Yeah!" honks another goose.</p>
<p>"HELLS YEAH!" honks the third goose.</p>`
            };
          }
        }
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
