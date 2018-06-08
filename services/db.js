var mongoose = require('mongoose');

var state = {
    db: null,
    battle: null,
    battleSchema : null
}

exports.get = function() {
    if(state.battle)
        return state.battle;
    else {
        getBattleModel();
        return state.battle
    }

}
  
exports.close = function(done) {
    if (state.db) {
        state.db.close(function(err, result) {
            if (err) return done(err);
        state.db = null
        state.mode = null
        done(err)
        })
    }
}

var arrOfValues = [
    { name:"Battle of the Golden Tooth", year:298, battle_number:1, attacker_king: "Joffrey/Tommen Baratheon", defender_king: "Robb Stark",attacker_1: "Lannister", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Tully", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "pitched battle", major_death:1, major_capture:0, attacker_size:15000, defender_size:4000, attacker_commander: "Jaime Lannister", defender_commander: "Clement Piper, Vance", summer:1, location: "Golden Tooth", region: "The Westerlands", note: ""},
    { name:"Battle at the Mummer's Ford", year:298, battle_number:2, attacker_king: "Joffrey/Tommen Baratheon", defender_king: "Robb Stark",attacker_1: "Lannister", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Baratheon", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "ambush", major_death:1, major_capture:0, attacker_size:0, defender_size:120, attacker_commander: "Gregor Clegane", defender_commander: "Beric Dondarrion", summer:1, location: "Mummer's Ford", region: "The Riverlands", note: ""},
    { name:"Battle of Riverrun", year:298, battle_number:3, attacker_king: "Joffrey/Tommen Baratheon", defender_king: "Robb Stark",attacker_1: "Lannister", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Tully", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "pitched battle", major_death:0, major_capture:1, attacker_size:15000, defender_size:10000, attacker_commander: "Jaime Lannister, Andros Brax", defender_commander: "Edmure Tully, Tytos Blackwood", summer:1, location: "Riverrun", region: "The Riverlands", note: ""},
    { name:"Battle of the Green Fork", year:298, battle_number:4, attacker_king: "Robb Stark", defender_king: "Joffrey/Tommen Baratheon",attacker_1: "Stark", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Lannister", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "loss", battle_type: "pitched battle", major_death:1, major_capture:1, attacker_size:18000, defender_size:20000, attacker_commander: "Roose Bolton, Wylis Manderly, Medger Cerwyn, Harrion Karstark, Halys Hornwood", defender_commander: "Tywin Lannister, Gregor Clegane, Kevan Lannister, Addam Marbrand", summer:1, location: "Green Fork", region: "The Riverlands", note: ""},
    { name:"Battle of the Whispering Wood", year:298, battle_number:5, attacker_king: "Robb Stark", defender_king: "Joffrey/Tommen Baratheon",attacker_1: "Stark", attacker_2: "Tully", attacker_3: "", attacker_4: "", defender_1: "Lannister", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "ambush", major_death:1, major_capture:1, attacker_size:1875, defender_size:6000, attacker_commander: "Robb Stark, Brynden Tully", defender_commander: "Jaime Lannister", summer:1, location: "Whispering Wood", region: "The Riverlands", note: ""},
    { name:"Battle of the Camps", year:298, battle_number:6, attacker_king: "Robb Stark", defender_king: "Joffrey/Tommen Baratheon",attacker_1: "Stark", attacker_2: "Tully", attacker_3: "", attacker_4: "", defender_1: "Lannister", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "ambush", major_death:0, major_capture:0, attacker_size:6000, defender_size:12625, attacker_commander: "Robb Stark, Tytos Blackwood, Brynden Tully", defender_commander: "Lord Andros Brax, Forley Prester", summer:1, location: "Riverrun", region: "The Riverlands", note: ""},
    { name:"Sack of Darry", year:298, battle_number:7, attacker_king: "Joffrey/Tommen Baratheon", defender_king: "Robb Stark",attacker_1: "Lannister", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Darry", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "pitched battle", major_death:0, major_capture:0, attacker_size:0, defender_size:0, attacker_commander: "Gregor Clegane", defender_commander: "Lyman Darry", summer:1, location: "Darry", region: "The Riverlands", note: ""},
    { name:"Battle of Moat Cailin", year:299, battle_number:8, attacker_king: "Balon/Euron Greyjoy", defender_king: "Robb Stark",attacker_1: "Greyjoy", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Stark", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "pitched battle", major_death:0, major_capture:0, attacker_size:0, defender_size:0, attacker_commander: "Victarion Greyjoy", defender_commander: "", summer:1, location: "Moat Cailin", region: "The North", note: ""},
    { name:"Battle of Deepwood Motte", year:299, battle_number:9, attacker_king: "Balon/Euron Greyjoy", defender_king: "Robb Stark",attacker_1: "Greyjoy", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Stark", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "siege", major_death:0, major_capture:0, attacker_size:1000, defender_size:0, attacker_commander: "Asha Greyjoy", defender_commander: "", summer:1, location: "Deepwood Motte", region: "The North", note: ""},
    { name:"Battle of the Stony Shore", year:299, battle_number:10, attacker_king: "Balon/Euron Greyjoy", defender_king: "Robb Stark",attacker_1: "Greyjoy", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Stark", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "ambush", major_death:0, major_capture:0, attacker_size:264, defender_size:0, attacker_commander: "Theon Greyjoy", defender_commander: "", summer:1, location: "Stony Shore", region: "The North", note: "Greyjoy's troop number based on the Battle of Deepwood Motte, in which Asha had 1000 soldier on 30 longships. That comes out to ~33 per longship. In the Battle of the Stony Shore, Theon has 8 longships, and just we can estimate that he has 8*33 =265 troops."},
    { name:"Battle of Torrhen's Square", year:299, battle_number:11, attacker_king: "Robb Stark", defender_king: "Balon/Euron Greyjoy",attacker_1: "Stark", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Greyjoy", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "pitched battle", major_death:0, major_capture:0, attacker_size:244, defender_size:900, attacker_commander: "Rodrik Cassel, Cley Cerwyn", defender_commander: "Dagmer Cleftjaw", summer:1, location: "Torrhen's Square", region: "The North", note: "Greyjoy's troop number comes from the 264 estimate to have arrived on the stony shore minus the 20 Theon takes to attack Winterfell. Thus 264-20=244"},
    { name:"Battle of Winterfell", year:299, battle_number:12, attacker_king: "Balon/Euron Greyjoy", defender_king: "Robb Stark",attacker_1: "Greyjoy", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Stark", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "ambush", major_death:0, major_capture:1, attacker_size:20, defender_size:0, attacker_commander: "Theon Greyjoy", defender_commander: "Bran Stark", summer:1, location: "Winterfell", region: "The North", note: "It isn't mentioned how many Stark men are left in Winterfell, other than 'very few'."},
    { name:"Sack of Torrhen's Square", year:299, battle_number:13, attacker_king: "Balon/Euron Greyjoy", defender_king: "Balon/Euron Greyjoy",attacker_1: "Greyjoy", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Stark", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "siege", major_death:0, major_capture:1, attacker_size:0, defender_size:0, attacker_commander: "Dagmer Cleftjaw", defender_commander: "", summer:1, location: "Torrhen's Square", region: "The North", note: ""},
    { name:"Sack of Winterfell", year:299, battle_number:14, attacker_king: "Joffrey/Tommen Baratheon", defender_king: "Robb Stark",attacker_1: "Bolton", attacker_2: "Greyjoy", attacker_3: "", attacker_4: "", defender_1: "Stark", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "ambush", major_death:1, major_capture:0, attacker_size:618, defender_size:2000, attacker_commander: "Ramsay Snow, Theon Greyjoy ", defender_commander: "Rodrik Cassel, Cley Cerwyn, Leobald Tallhart", summer:1, location: "Winterfell", region: "The North", note: "Since House Bolton betrays the Starks for House Lannister, we code this battle as between these two houses. Greyjoy men, numbering only 20, don't play a major part in the fighting and end up dying anyway."},
    { name:"Battle of Oxcross", year:299, battle_number:15, attacker_king: "Robb Stark", defender_king: "Joffrey/Tommen Baratheon",attacker_1: "Stark", attacker_2: "Tully", attacker_3: "", attacker_4: "", defender_1: "Lannister", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "ambush", major_death:1, major_capture:1, attacker_size:6000, defender_size:10000, attacker_commander: "Robb Stark, Brynden Tully", defender_commander: "Stafford Lannister, Roland Crakehall, Antario Jast", summer:1, location: "Oxcross", region: "The Westerlands", note: ""},
    { name:"Siege of Storm's End", year:299, battle_number:16, attacker_king: "Stannis Baratheon", defender_king: "Renly Baratheon",attacker_1: "Baratheon", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Baratheon", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "siege", major_death:1, major_capture:0, attacker_size:5000, defender_size:20000, attacker_commander: "Stannis Baratheon, Davos Seaworth", defender_commander: "Renly Baratheon, Cortnay Penrose, Loras Tyrell, Randyll Tarly, Mathis Rowan", summer:1, location: "Storm's End", region: "The Stormlands", note: ""},
    { name:"Battle of the Fords", year:299, battle_number:17, attacker_king: "Joffrey/Tommen Baratheon", defender_king: "Robb Stark",attacker_1: "Lannister", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Tully", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "loss", battle_type: "pitched battle", major_death:0, major_capture:0, attacker_size:20000, defender_size:10000, attacker_commander: "Tywin Lannister, Flement Brax, Gregor Clegane, Addam Marbrand, Lyle Crakehall, Leo Lefford", defender_commander: "Edmure Tully, Jason Mallister, Karyl Vance", summer:1, location: "Red Fork", region: "The Riverlands", note: ""},
    { name:"Sack of Harrenhal", year:299, battle_number:18, attacker_king: "Robb Stark", defender_king: "Joffrey/Tommen Baratheon",attacker_1: "Stark", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Lannister", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "ambush", major_death:1, major_capture:0, attacker_size:100, defender_size:100, attacker_commander: "Roose Bolton, Vargo Hoat, Robett Glover", defender_commander: "Amory Lorch", summer:1, location: "Harrenhal", region: "The Riverlands", note: ""},
    { name:"Battle of the Crag", year:299, battle_number:19, attacker_king: "Robb Stark", defender_king: "Joffrey/Tommen Baratheon",attacker_1: "Stark", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Lannister", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "ambush", major_death:0, major_capture:0, attacker_size:6000, defender_size:0, attacker_commander: "Robb Stark, Smalljon Umber, Black Walder Frey", defender_commander: "Rolph Spicer", summer:1, location: "Crag", region: "The Westerlands", note: ""},
    { name:"Battle of the Blackwater", year:299, battle_number:20, attacker_king: "Stannis Baratheon", defender_king: "Joffrey/Tommen Baratheon",attacker_1: "Baratheon", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Lannister", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "loss", battle_type: "pitched battle", major_death:1, major_capture:1, attacker_size:21000, defender_size:7250, attacker_commander: "Stannis Baratheon, Imry Florent, Guyard Morrigen, Rolland Storm, Salladhor Saan, Davos Seaworth", defender_commander: "Tyrion Lannister, Jacelyn Bywater, Sandor Clegane, Tywin Lannister, Garlan Tyrell, Mace Tyrell, Randyll Tarly", summer:1, location: "King's Landing", region: "The Crownlands", note: ""},
    { name:"Siege of Darry", year:299, battle_number:21, attacker_king: "Robb Stark", defender_king: "Joffrey/Tommen Baratheon",attacker_1: "Darry", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Lannister", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "siege", major_death:0, major_capture:0, attacker_size:0, defender_size:0, attacker_commander: "Helman Tallhart", defender_commander: "", summer:1, location: "Darry", region: "The Riverlands", note: ""},
    { name:"Battle of Duskendale", year:299, battle_number:22, attacker_king: "Robb Stark", defender_king: "Joffrey/Tommen Baratheon",attacker_1: "Stark", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Lannister", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "loss", battle_type: "pitched battle", major_death:1, major_capture:0, attacker_size:3000, defender_size:0, attacker_commander: "Robertt Glover, Helman Tallhart", defender_commander: "Randyll Tarly, Gregor Clegane", summer:1, location: "Duskendale", region: "The Crownlands", note: ""},
    { name:"Battle of the Burning Septry", year:299, battle_number:23, attacker_king: "", defender_king: "",attacker_1: "Brotherhood without Banners", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Brave Companions", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "pitched battle", major_death:0, major_capture:0, attacker_size:0, defender_size:0, attacker_commander: "", defender_commander: "", summer:1, location: "", region: "The Riverlands", note: ""},
    { name:"Battle of the Ruby Ford", year:299, battle_number:24, attacker_king: "Joffrey/Tommen Baratheon", defender_king: "Robb Stark",attacker_1: "Lannister", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Stark", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "pitched battle", major_death:0, major_capture:0, attacker_size:0, defender_size:6000, attacker_commander: "Gregor Clegane", defender_commander: "Roose Bolton, Wylis Manderly", summer:0, location: "Ruby Ford", region: "The Riverlands", note: ""},
    { name:"Retaking of Harrenhal", year:299, battle_number:25, attacker_king: "Joffrey/Tommen Baratheon", defender_king: "",attacker_1: "Lannister", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Brave Companions", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "pitched battle", major_death:1, major_capture:0, attacker_size:0, defender_size:0, attacker_commander: "Gregor Clegane", defender_commander: "Vargo Hoat", summer:1, location: "Harrenhal", region: "The Riverlands", note: ""},
    { name:"The Red Wedding", year:299, battle_number:26, attacker_king: "Joffrey/Tommen Baratheon", defender_king: "Robb Stark",attacker_1: "Frey", attacker_2: "Bolton", attacker_3: "", attacker_4: "", defender_1: "Stark", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "ambush", major_death:1, major_capture:1, attacker_size:3500, defender_size:3500, attacker_commander: "Walder Frey, Roose Bolton, Walder Rivers", defender_commander: "Robb Stark", summer:1, location: "The Twins", region: "The Riverlands", note: "This observation refers to the battle against the Stark men, not the attack on the wedding"},
    { name:"Siege of Seagard", year:299, battle_number:27, attacker_king: "Robb Stark", defender_king: "Joffrey/Tommen Baratheon",attacker_1: "Frey", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Mallister", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "siege", major_death:0, major_capture:1, attacker_size:0, defender_size:0, attacker_commander: "Walder Frey", defender_commander: "Jason Mallister", summer:1, location: "Seagard", region: "The Riverlands", note: ""},
    { name:"Battle of Castle Black", year:300, battle_number:28, attacker_king: "Stannis Baratheon", defender_king: "Mance Rayder",attacker_1: "Free folk", attacker_2: "Thenns", attacker_3: "Giants", attacker_4: "", defender_1: "Night's Watch", defender_2: "Baratheon", defender_2: "", defender_4: "", attacker_outcome: "loss", battle_type: "siege", major_death:1, major_capture:1, attacker_size:100000, defender_size:1240, attacker_commander: "Mance Rayder, Tormund Giantsbane, Harma Dogshead, Magnar Styr, Varamyr", defender_commander: "Stannis Baratheon, Jon Snow, Donal Noye, Cotter Pyke", summer:0, location: "Castle Black", region: "Beyond the Wall", note: ""},
    { name:"Fall of Moat Cailin", year:300, battle_number:29, attacker_king: "Joffrey/Tommen Baratheon", defender_king: "Balon/Euron Greyjoy",attacker_1: "Bolton", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Greyjoy", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "siege", major_death:0, major_capture:0, attacker_size:0, defender_size:0, attacker_commander: "Ramsey Bolton", defender_commander: "", summer:0, location: "Moat Cailin", region: "The North", note: ""},
    { name:"Sack of Saltpans", year:300, battle_number:30, attacker_king: "", defender_king: "",attacker_1: "Brave Companions", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "razing", major_death:0, major_capture:0, attacker_size:0, defender_size:0, attacker_commander: "Rorge", defender_commander: "", summer:0, location: "Saltpans", region: "The Riverlands", note: ""},
    { name:"Retaking of Deepwood Motte", year:300, battle_number:31, attacker_king: "Stannis Baratheon", defender_king: "Balon/Euron Greyjoy",attacker_1: "Baratheon", attacker_2: "Karstark", attacker_3: "Mormont", attacker_4: "Glover", defender_1: "Greyjoy", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "pitched battle", major_death:0, major_capture:0, attacker_size:4500, defender_size:200, attacker_commander: "Stannis Baratheon, Alysane Mormot", defender_commander: "Asha Greyjoy", summer:0, location: "Deepwood Motte", region: "The North", note: ""},
    { name:"Battle of the Shield Islands", year:300, battle_number:32, attacker_king: "Balon/Euron Greyjoy", defender_king: "Joffrey/Tommen Baratheon",attacker_1: "Greyjoy", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Tyrell", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "pitched battle", major_death:0, major_capture:0, attacker_size:0, defender_size:0, attacker_commander: "Euron Greyjoy, Victarion Greyjoy", defender_commander: "", summer:0, location: "Shield Islands", region: "The Reach", note: ""},
    { name:"Invasion of Ryamsport, Vinetown, and Starfish Harbor", year:300, battle_number:33, attacker_king: "Balon/Euron Greyjoy", defender_king: "Joffrey/Tommen Baratheon",attacker_1: "Greyjoy", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Tyrell", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "razing", major_death:0, major_capture:0, attacker_size:0, defender_size:0, attacker_commander: "Euron Greyjoy, Victarion Greyjoy", defender_commander: "", summer:0, location: "Ryamsport, Vinetown, Starfish Harbor", region: "The Reach", note: ""},
    { name:"Second Seige of Storm's End", year:300, battle_number:34, attacker_king: "Joffrey/Tommen Baratheon", defender_king: "Stannis Baratheon",attacker_1: "Baratheon", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Baratheon", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "siege", major_death:0, major_capture:0, attacker_size:0, defender_size:200, attacker_commander: "Mace Tyrell, Mathis Rowan", defender_commander: "Gilbert Farring", summer:0, location: "Storm's End", region: "The Stormlands", note: ""},
    { name:"Siege of Dragonstone", year:300, battle_number:35, attacker_king: "Joffrey/Tommen Baratheon", defender_king: "Stannis Baratheon",attacker_1: "Baratheon", attacker_2: "", attacker_3: "", attacker_4: "", defender_1: "Baratheon", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "siege", major_death:0, major_capture:0, attacker_size:2000, defender_size:0, attacker_commander: "Loras Tyrell, Raxter Redwyne", defender_commander: "Rolland Storm", summer:0, location: "Dragonstone", region: "The Stormlands", note: ""},
    { name:"Siege of Riverrun", year:300, battle_number:36, attacker_king: "Joffrey/Tommen Baratheon", defender_king: "Robb Stark",attacker_1: "Lannister", attacker_2: "Frey", attacker_3: "", attacker_4: "", defender_1: "Tully", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "siege", major_death:0, major_capture:0, attacker_size:3000, defender_size:0, attacker_commander: "Daven Lannister, Ryman Fey, Jaime Lannister", defender_commander: "Brynden Tully", summer:0, location: "Riverrun", region: "The Riverlands", note: ""},
    { name:"Siege of Raventree", year:300, battle_number:37, attacker_king: "Joffrey/Tommen Baratheon", defender_king: "Robb Stark",attacker_1: "Bracken", attacker_2: "Lannister", attacker_3: "", attacker_4: "", defender_1: "Blackwood", defender_2: "", defender_2: "", defender_4: "", attacker_outcome: "win", battle_type: "siege", major_death:0, major_capture:1, attacker_size:1500, defender_size:0, attacker_commander: "Jonos Bracken, Jaime Lannister", defender_commander: "Tytos Blackwood", summer:0, location: "Raventree", region: "The Riverlands", note: ""},
    { name:"Siege of Winterfell", year:300, battle_number:38, attacker_king: "Stannis Baratheon", defender_king: "Joffrey/Tommen Baratheon",attacker_1: "Baratheon", attacker_2: "Karstark", attacker_3: "Mormont", attacker_4: "Glover", defender_1: "Bolton", defender_2: "Frey", defender_2: "", defender_4: "", attacker_outcome: "", battle_type: "", major_death:0, major_capture:0, attacker_size:5000, defender_size:8000, attacker_commander: "Stannis Baratheon", defender_commander: "Roose Bolton", summer:0, location: "Winterfell", region: "The North", note: ""},
]

exports.connect = function(url, done) {

    mongoose.connect(url)

    mongoose.Promise = global.Promise;
    state.db = mongoose.connection;
    var Schema = mongoose.Schema;

    state.battleSchema = new Schema({
        name: String,
        year: Number,
        battle_number: {
            type: String,
            unique: true
        },
        attacker_king: String,
        defender_king: String,
        attacker_1: String,
        attacker_2: String,
        attacker_3: String,
        attacker_4: String,
        defender_1: String,
        defender_2: String,
        defender_3: String,
        defender_4: String,
        attacker_outcome: String,
        battle_type: String,
        major_death: Number,
        major_capture: Number,
        attacker_size: Number,
        defender_size: Number,
        attacker_commander: String,
        defender_commander: String,
        summer: Number,
        location: String,
        region: String,
        note: String
    })

    state.db.once('open',
        () => {
            console.log("Database connected");
            InsertBattleData();
            state.battle = mongoose.model("battle", state.battleSchema);
        })
    
    state.db.on('error', console.error.bind(console, "connection error"));

}

const getBattleModel = function(db) {
    state.battle = mongoose.model("battle", state.battleSchema);
}

const InsertBattleData = function(db) {

    if(!state.battle)
        getBattleModel();
    
    state.battle.insertMany(arrOfValues, function(error, docs) {});


}