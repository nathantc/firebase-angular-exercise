(function() {

    function init() {
        var tables = angular.module('Tables', []);
        tables.constant('TableMetatypeAttribute', metatypeAttribute);
        tables.constant('TablePriority', priority);
        tables.constant('NameArrays', NameArrays);
        tables.constant('NameArrayAttributes', NameArrays.attributes);
        tables.constant('NameArrayStandardAttributes', NameArrays.standardAttributes);
        tables.constant('NameArraySpecialAttributes', NameArrays.specialAttributes);
        tables.constant('Qualities', qualities);
    }

    var NameArrays = {
        attributes: ['body', 'agility', 'reaction', 'strength', 'charisma', 'intuition', 'logic', 'willpower', 'edge', 'magicOrResonance'],
        standardAttributes: ['body', 'agility', 'reaction', 'strength', 'charisma', 'intuition', 'logic', 'willpower'],
        specialAttributes: ['edge', 'magicOrResonance']
    }

    var metatypeAttribute =
    {
        "human" : {
            "body": {
                "base": 1,
                "limit": 6
            },
            "agility": {
                "base": 1,
                "limit": 6
            },
            "reaction": {
                "base": 1,
                "limit": 6
            },
            "strength": {
                "base": 1,
                "limit": 6
            },
            "willpower": {
                "base": 1,
                "limit": 6
            },
            "logic": {
                "base": 1,
                "limit": 6
            },
            "intuition": {
                "base": 1,
                "limit": 6
            },
            "charisma": {
                "base": 1,
                "limit": 6
            },
            "edge": {
                "base": 2,
                "limit": 7
            },
            "magicOrResonance": {
                "base": 0,
                "limit": 6
            },
            "essence": 6,
            "racial": "None"
        },
        "elf" : {
            "body": {
                "base": 1,
                "limit": 6
            },
            "agility": {
                "base": 2,
                "limit": 7
            },
            "reaction": {
                "base": 1,
                "limit": 6
            },
            "strength": {
                "base": 1,
                "limit": 6
            },
            "willpower": {
                "base": 1,
                "limit": 6
            },
            "logic": {
                "base": 1,
                "limit": 6
            },
            "intuition": {
                "base": 1,
                "limit": 6
            },
            "charisma": {
                "base": 3,
                "limit": 8
            },
            "edge": {
                "base": 1,
                "limit": 6
            },
            "magicOrResonance": {
                "base": 0,
                "limit": 6
            },
            "essence": 6,
            "racial": "Low-Light Vision"
        },
        "dwarf" : {
            "body": {
                "base": 3,
                "limit": 8
            },
            "agility": {
                "base": 1,
                "limit": 6
            },
            "reaction": {
                "base": 1,
                "limit": 5
            },
            "strength": {
                "base": 3,
                "limit": 8
            },
            "willpower": {
                "base": 2,
                "limit": 7
            },
            "logic": {
                "base": 1,
                "limit": 6
            },
            "intuition": {
                "base": 1,
                "limit": 6
            },
            "charisma": {
                "base": 1,
                "limit": 6
            },
            "edge": {
                "base": 1,
                "limit": 6
            },
            "magicOrResonance": {
                "base": 0,
                "limit": 6
            },
            "essence": 6,
            "racial": "+2 dice for pathogen and toxin resistance, +20% increased Lifestyle cost"
        },
        "ork" : {
            "body": {
                "base": 4,
                "limit": 9
            },
            "agility": {
                "base": 1,
                "limit": 6
            },
            "reaction": {
                "base": 1,
                "limit": 6
            },
            "strength": {
                "base": 3,
                "limit": 8
            },
            "willpower": {
                "base": 1,
                "limit": 6
            },
            "logic": {
                "base": 1,
                "limit": 5
            },
            "intuition": {
                "base": 1,
                "limit": 6
            },
            "charisma": {
                "base": 1,
                "limit": 5
            },
            "edge": {
                "base": 1,
                "limit": 6
            },
            "magicOrResonance": {
                "base": 0,
                "limit": 6
            },
            "essence": 6,
            "racial": "Low-Light Vision"
        },
        "troll" : {
            "body": {
                "base": 5,
                "limit": 10
            },
            "agility": {
                "base": 1,
                "limit": 5
            },
            "reaction": {
                "base": 1,
                "limit": 6
            },
            "strength": {
                "base": 5,
                "limit": 10
            },
            "willpower": {
                "base": 1,
                "limit": 6
            },
            "logic": {
                "base": 1,
                "limit": 5
            },
            "intuition": {
                "base": 1,
                "limit": 5
            },
            "charisma": {
                "base": 1,
                "limit": 4
            },
            "edge": {
                "base": 1,
                "limit": 6
            },
            "magicOrResonance": {
                "base": 0,
                "limit": 6
            },
            "essence": 6,
            "racial": "Thermographic Vision, +1 Reach, +1 dermal armor, +100% increased Lifestyle costs"
        }
    };

    var priority =
    {
        "A": {
            "metatype": {
                "human": 9,
                "elf": 8,
                "dwarf": 7,
                "ork": 7,
                "troll": 5
            },
            "attributes": 24,
            "magicOrResonance": [{
                "type": "Magician or Mystic Adept",
                "description": "Magic 6, two Rating 5 Magical skills, 10 spells",
                "magic": 6
            },
                {
                    "type": "Technomancer",
                    "description": "Resonance 6, two Rating 5 Resonance skills, 5 complex forms",
                    "resonance": 6
                }
            ],
            "skills": {
                "skill": 46,
                "group": 10
            },
            "resources": 450000
        },
        "B": {
            "metatype": {
                "human": 7,
                "elf": 6,
                "dwarf": 4,
                "ork": 4,
                "troll": 0
            },
            "attributes": 20,
            "magicOrResonance": [{
                "type": "Magician or Mystic Adept",
                "description": "Magic 4, two Rating 4 Magical skills, 7 spells",
                "magic": 4
            },
                {
                    "type": "Technomancer",
                    "description": "Resonance 4, two Rating 4 Resonance skills, 2 complex forms",
                    "resonance": 4
                },
                {
                    "type": "Adept",
                    "description": "Magic 6, one Rating 4 Active skill",
                    "magic": 6
                },
                {
                    "type": "Aspected Magician",
                    "description": "Magic 5, one Rating 4 Magical skill group",
                    "magic": 5
                }
            ],
            "skills": {
                "skill": 36,
                "group": 5
            },
            "resources": 275000
        },
        "C": {
            "metatype": {
                "human": 5,
                "elf": 3,
                "dwarf": 1,
                "ork": 0
            },
            "attributes": 16,
            "magicOrResonance": [{
                "type": "Magician or Mystic Adept",
                "description": "Magic 3, 5 spells",
                "magic": 3
            },
                {
                    "type": "Technomancer",
                    "description": "Resonance 3, 1 complex form",
                    "resonance": 3
                },
                {
                    "type": "Adept",
                    "description": "Magic 4, one Rating 2 Active skill",
                    "resonance": 4
                },
                {
                    "type": "Aspected Magician",
                    "description": "Magic 3, one Rating 2 Magical skill group",
                    "magic": 3
                }
            ],
            "skills": {
                "skill": 28,
                "group": 2
            },
            "resources": 140000
        },
        "D": {
            "metatype": {
                "human": 3,
                "elf": 0
            },
            "attributes": 14,
            "magicOrResonance": [{
                "type": "Adept",
                "description": "Magic 2",
                "magic": 2
            },
                {
                    "type": "Aspected Magician",
                    "description": "Magic 2",
                    "magic": 2
                }
            ],
            "skills": {
                "skill": 22,
                "group": 0
            },
            "resources": 50000
        },
        "E": {
            "metatype": {
                "human": 1
            },
            "attributes": 12,
            "magicOrResonance": [],
            "skills": {
                "skill": 18,
                "group": 0
            },
            "resources": 6000
        }
    };

    var qualities = {
        "ambidextrous": {
            "name": "Ambidextrous",
            "karma": 4,
            "short": "Removes penalty for attacker using off-hand weapon.",
            "description": "The Ambidextrous character can handle objects equally well with either hand. Without this quality, any action performed solely with the off–hand (i.e., firing a gun) suffers a –2 dice pool modifier (see Attacker Using Off-Hand Weapon, p. 178)."
        },
        "analyticalMind": {
            "name": "Analytical Mind",
            "karma": 5,
            "short": "Gives the character a +2 dice pool modifier to any Logic Tests involving pattern recognition, evidence analysis, clue hunting, or solving puzzles.",
            "description": "Analytical Mind describes the uncanny ability to logically analyze information, deduce solutions to problems, or separate vital information from distractions and noise. It’s useful in cracking cyphers, solving puzzles, figuring out traps, and sifting through data. This quality gives the character a +2 dice pool modifier to any Logic Tests involving pattern recognition, evidence analysis, clue hunting, or solving puzzles. This quality also reduces the time it takes the character to solve a problem by half."
        },
        "aptitude": {
            "name": "Aptitude",
            "karma": 14,
            "short": "Have one skill rated at 7 at character creation, and may eventually build that skill up to rating 13.",
            "description": "This quality is how you become even better than the best in the world. The standard limit for skills is 12. Every so often, there is a character who can exceed limitations and be truly exceptional in a particular skill. With this particular quality, the character can have one skill rated at 7 at character creation, and may eventually build that skill up to rating 13. Characters may only take the Aptitude quality once."
        },
        "astralChameleon": {
            "name": "Astral Chameleon",
            "karma": 10,
            "short": "All signatures left by the character last only half as long as other astral signatures.",
            "description": "With the Astral Chameleon quality, the character’s astral signature blends into the background of astral space and is difficult to detect. All signatures left by the character last only half as long as other astral signatures. Any individuals assensing astral signatures left behind by a character with this quality receive a –2 dice pool modifier for the Assensing Test. Only characters with a Magic rating and capable of leaving astral signatures may have this quality."
        },
        "bilingual": {
            "name": "Bilingual",
            "karma": 5,
            "short": "Read, write, and speak a second language fluently.",
            "description": "A character with this quality reads, writes, and speaks a second language fluently. They can list a second language as a native tongue (see Language Skills, p. 150). This quality can only be acquired at character creation; selecting it gives the character a second free language skill during Step Five: Purchase Active, Knowledge, and Language Skills, (p. 88)."
        },
        "blandness": {
            "name": "Blandness",
            "karma": 8,
            "short": "This character blends into a crowd; he's seldom noticed and easily forgotten.",
            "description": "This character blends into a crowd; he’s seldom noticed and easily forgotten. He is unremarkable in every aspect of physical appearance. Anyone attempting to describe the character cannot come up with anything more precise than “average height, average build, average hair, etc.” Increase the threshold for anyone to recall specific details about the character by 1. This means a Memory Test with a difficulty of Average (threshold of 2) becomes a Hard test (threshold of 3). Individuals attempting to shadow or physically locate a character with the Blandness quality in a populated setting receive a –2 dice pool modifier on all tests related to their search. The same penalty applies if they’re asking around about the person based on the individual’s physical appearance. The modifier does not, however, apply to magical or Matrix searches. If the character acquires any visible tattoos, scars, obvious cyberware, or other distinguishing features, the bonuses from the Blandness quality go away until the distinctive features are removed from the character’s appearance. In certain circumstances and specific situations, the gamemaster may determine that Blandness does not apply. For example, a troll with the Blandness quality still towers head and shoulders over a crowd of humans and so still stands out, no matter how average their horns may be. The character only regains his bonus by leaving the situation where he stands out."
        },
        "catlike": {
            "name": "Catlike",
            "karma": 7,
            "short": "Adds a +2 dice pool modifier to Sneaking skill tests.",
            "description": "A character with the Catlike quality is gifted with an uncanny elegance, a stealthy gait, and an almost preternatural ability to move without making a sound. They also claim they land on their feet when dropped, though they tend not to let people test this. This quality adds a +2 dice pool modifier to Sneaking skill tests."
        },
        "codeslinger": {
            "name": "Codeslinger",
            "karma": 10,
            "short": "Receives a +2 dice pool modifier to a Matrix action.",
            "description": "Ones and zeroes are practically a native language to a Codeslinger. The character is adept at performing a particular Matrix action (which she selects when she selects this quality) and receives a +2 dice pool modifier to that Matrix action. This can only be selected for Matrix Actions (p. 237) that have a test associated with them."
        },
        "Double-Jointed": {
            "name": "Double-Jointed",
            "karma": 6,
            "short": "The character receives a +2 dice pool modifier for Escape Artist tests.",
            "description": "A Double-Jointed character has unusually flexible joints and can bend and contort his body into extreme positions. The character receives a +2 dice pool modifier for Escape Artist tests. The character may also be able to squeeze into small, cramped spaces where less limber characters cannot. They’re also great at parties and bars."
        },
        "exceptionalAttribute": {
            "name": "Exceptional Attribute",
            "karma": 14,
            "short": "Allows one attribute at a level one point above the metatype maximum limit.",
            "description": "The Exceptional Atribute quality is how you get to be the charismatic troll, or the agile dwarf. It allows you to possess one attribute at a level one point above the metatype maximum limit. For example, an ork character with the Exceptional Attribute quality for Strength could take his Strength attribute up to 10 before augmentations are applied, instead of the normal limit of 9. Exceptional Attribute also applies toward Special Attributes such as Magic and Resonance. Edge cannot affected by the Exceptional Attribute (Edge is raised by another quality called Lucky). A character may only take Exceptional Attribute once, and only with the gamemaster’s approval."
        },
        "focusedConcentration": {
            "name": "Focused Concentration",
            "karma": 4,
            "maxRating": 6,
            "short": "Technomancer is able to sustain one spell/complex form with a force/level equal to her Focused Concentration rating without suffering any penalties.",
            "description": "A technomancer or magic user with the Focused Concentration quality has the discipline to manipulate mana or Resonance more precisely than otherwise possible. This precision reduces stress to the magic user’s or technomancer’s body. She is able to sustain one spell/complex form with a force/level equal to her Focused Concentration rating without suffering any penalties. For example, a magic user with Focused Concentration rating 3 may sustain a Force 3 Armor spell without taking the negative dice pool modifier for sustaining a spell. Sustaining any additional spells or complex forms incurs the standard –2 dice pool modifier per spell or complex form sustained. This quality may only be taken by magic user characters that are able to cast spells and technomancers."
        },
        "gearhead": {
            "name": "Gearhead",
            "karma": 11,
            "short": "Gearhead can increase the Speed or Handling of her vehicle or drone.",
            "description": "The Gearhead is who you look for when it’s time to stomp on the gas and move. She’s a natural-born driver or pilot. When she’s at the wheel/stick/controls of a vehicle or drone, she has an intuitive understanding of its limitations and its capabilities and is able to coax whatever machine she’s controlling to perform at its best. During vehicle or chase combat, a Gearhead can increase the Speed of her vehicle or drone by 20 percent or increase the Handling modifier by +1 (player’s choice). She also receives a +2 dice pool modifier when attempting difficult maneuvers or stunts in the vehicle. This bonus lasts for 1D6 minutes. The player can choose to make this bonus last up to an additional 1D6 minutes if she wants. Doing so pushes the vehicle or drone well beyond its design limits and risks catastrophic damage. For each minute the character pushes the vehicle past its initial bonus period, the vehicle automatically takes one point of stress damage (unresisted)"
        },
        "guts": {
            "name": "Guts",
            "karma": 10,
            "short": "Guts gives a character a +2 dice pool modifier on tests to resist fear and intimidation.",
            "description": "When a bug spirit with dripping mandibles comes calling, the character with Guts is the one most likely to stand and fight instead of freaking the hell out. Guts gives a character a +2 dice pool modifier on tests to resist fear and intimidation, including magically induced fear from spells or critter powers."
        },

        "addictionMild": {
            "name": "Addiction: Mild",
            "karma": -4,
            "short": "While the character is suffering withdrawal symptoms, apply a –2 dice pool modifier to all physical or mental attribute-based tests.",
            "description": "Mild (4 Karma)/1 dose or 1 hour of habit-related activity: Mild cravings occur once a month for the character. If a character fails his Withdrawal Test, he suffers symptoms of withdrawal and must actively seek out and use the substance or engage in the activity to find relief. On a run, this could mean delaying plans that the runner team may have meticulously put together for a job, especially if the character is busy gambling with a bookie or slotting a BTL instead of being available for the run. While the character is suffering withdrawal symptoms, apply a –2 dice pool modifier to all of the character’s Mental-attribute-based tests (if psychological dependency) or to all the character’s Physical-attribute-based tests (if physiological dependency). If the character succeeds on his Withdrawal Test, the character does not suffer withdrawal symptoms and does not need the substance or participate in that habit until the character makes their next Withdrawal Test (in one month). He is able to stay clean for that month."
        },
        "addictionModerate": {
            "name": "Addiction: Moderate",
            "karma": -9,
            "short": "If the character experiences withdrawal, he suffers a –4 to all physical or mental attribute-based tests.",
            "description": "Moderate (9 Karma)/1 dose or 1 hour of habit-related activity: A craving at the Moderate level occurs roughly every two weeks. If the character experiences withdrawal, he suffers a –4 to all Mental-attribute-based tests (if psychological dependency) or –4 to all Physical-attribute-based tests (if physiological dependency) until the craving is satisfied."
        },
        "allergyUncommon": {
            "name": "Allergy: Uncommon",
            "karma": -2,
            "short": "The substance or condition is rare for the local environment. Examples: silver, gold, antibiotics, grass.",
            "description": "A character with the Allergy quality is allergic to a substance or condition found in their environment. The value of this quality depends on two factors. The first is whether the substance or condition is Uncommon (2 Karma) or Common (7 Karma). Next, determine the severity of the symptoms: Mild (3 Karma), Moderate (8 Karma), Severe (13 Karma), or Extreme (18 Karma). Add the appropriate point values together to find the final value. For example, the value of an Uncommon Moderate Allergy (Silver) is 10 Karma (2+8 Karma). If a character is attacked with a substance to which they are allergic, they lose 1 die from their Resistance Test for each stage of severity of the Allergy (e.g., 1 die for a Mild allergy, 2 dice for a Moderate allergy, etc.)."
        }
    };

    init();
})();
