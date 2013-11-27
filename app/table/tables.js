(function() {

    function init() {
        var tables = angular.module('Tables', []);
        tables.constant('TableMetatypeAttribute', metatypeAttribute);
        tables.constant('TablePriority', priority);
        tables.constant('NameArrays', NameArrays);
        tables.constant('NameArrayAttributes', NameArrays.attributes);
        tables.constant('NameArrayStandardAttributes', NameArrays.standardAttributes);
        tables.constant('NameArraySpecialAttributes', NameArrays.specialAttributes);
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

    init();
})();
