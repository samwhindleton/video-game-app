// ----------------------------------------
// | DEPENDENCIES                         |
// ----------------------------------------
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


// ----------------------------------------
// | MODELS                               |
// ----------------------------------------
const User = require('../../models/users.js');
const Game = require('../../models/game.js');

const newUsers = [
  {
    firstname: "John",
    lastname: "Smith",
    username: "LastSamurai",
    password: "LastSamurai",
    email: "john.smith@noemail.com",
  },
  {
    firstname: "Mary",
    lastname: "Jones",
    username: "PetalPrincess",
    password: "PetalPrincess",
    email: "mary.jones@noemail.com",
  },
  {
    firstname: "Oliver",
    lastname: "Williams",
    username: "CapnBloodBeard",
    password: "CapnBloodBeard",
    email: "oliver.williams@noemail.com",
  },
  {
    firstname: "Elizabeth",
    lastname: "Taylor",
    username: "FallenAngel",
    password: "FallenAngel",
    email: "elizabeth.taylor@noemail.com",
  },
  {
    firstname: "William",
    lastname: "Brown",
    username: "SavageHorseman",
    password: "SavageHorseman",
    email: "william.brown@noemail.com",
  },
  {
    firstname: "Olivia",
    lastname: "Davies",
    username: "IMTooPrettyToDie",
    password: "IMTooPrettyToDie",
    email: "olivia.davies@noemail.com",
  },
  {
    firstname: "Jack",
    lastname: "Evans",
    username: "LoneWalker",
    password: "LoneWalker",
    email: "jack.evans@noemail.com",
  },
  {
    firstname: "Sarah",
    lastname: "Thomas",
    username: "CatWoman",
    password: "CatWoman",
    email: "sarah.thomas@noemail.com",
  },
  {
    firstname: "Thomas",
    lastname: "Johnson",
    username: "BeoWulf",
    password: "BeoWulf",
    email: "thomas.johnson@noemail.com",
  },
  {
    firstname: "Isla",
    lastname: "Wilson",
    username: "SniperFemme",
    password: "SniperFemme",
    email: "isla.wilson@noemail.com",
  },
  {
    firstname: "Harry",
    lastname: "Roberts",
    username: "DexterzProtege",
    password: "DexterzProtege",
    email: "harry.roberts@noemail.com",
  },
  {
    firstname: "Margaret",
    lastname: "Robinson",
    username: "CursedWings",
    password: "CursedWings",
    email: "margaret.robinson@noemail.com",
  },
  {
    firstname: "George",
    lastname: "Wright",
    username: "NoTolerance",
    password: "NoTolerance",
    email: "george.wright@noemail.com",
  },
  {
    firstname: "Emily",
    lastname: "Thompson",
    username: "IceQueen",
    password: "IceQueen",
    email: "emily.thompson@noemail.com",
  },
  {
    firstname: "Jacob",
    lastname: "White",
    username: "DarkLord",
    password: "DarkLord",
    email: "jacob.white@noemail.com",
  },
  {
    firstname: "Ann",
    lastname: "Hall",
    username: "SongbirdFatale",
    password: "SongbirdFatale",
    email: "ann.hall@noemail.com",
  },
  {
    firstname: "James",
    lastname: "Walker",
    username: "InfernalHeir",
    password: "InfernalHeir",
    email: "james.walker@noemail.com",
  },
  {
    firstname: "Jane",
    lastname: "Green",
    username: "LadyPhantom",
    password: "LadyPhantom",
    email: "jane.green@noemail.com",
  },
  {
    firstname: "Robert",
    lastname: "Edwards",
    username: "RuthlessSlayer",
    password: "RuthlessSlayer",
    email: "robert.edwards@noemail.com",
  },
  {
    firstname: "Ava",
    lastname: "Wood",
    username: "WarriorPriestess",
    password: "WarriorPriestess",
    email: "ava.woods@noemail.com",
  },
  {
    firstname: "Charles",
    lastname: "Hughes",
    username: "JackSparrow",
    password: "JackSparrow",
    email: "charles.hughes@noemail.com",
  },
  {
    firstname: "Alice",
    lastname: "Jackson",
    username: "Hraefn",
    password: "Hraefn",
    email: "alice.jackson@noemail.com",
  },
  {
    firstname: "George",
    lastname: "Turner",
    username: "Kladenstien",
    password: "Kladenstien",
    email: "george.turner@noemail.com",
  },
  {
    firstname: "Isabella",
    lastname: "Lewis",
    username: "Zeldarian",
    password: "Zeldarian",
    email: "isabella.lewis@noemail.com",
  },
  {
    firstname: "Henry",
    lastname: "Harris",
    username: "WarHawk",
    password: "WarHawk",
    email: "henery.harris@noemail.com",
  }
];

const newGames = [
  {
    title: "Legend of Zelda: Ocarina of Time",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/zelda.jpg",
    description: "Considered one of the best games ever when it became a hit on Gameboy it was released by NES in 1998 and players were blown away by the graphics and gameplay of the game compared with the other Gameboy Zelda games. Originally designed for the Nintendo 64DD, it was released instead on a 256-megabit cartridge, the largest-capacity cartridge NES ever produced and also was the first with 3D graphics.",
    user_id: "",
  },
  {
    title: "Pokemon Red, Blue, and Greenpmr",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/pokemon.jpg",
    description: "Over 20 million copies of these role-playing games were sold by Nintendo for Gameboy. Developed by Game Freak, the first installments were Red and Green, which were released in Japan in 1996. Blue was later released in the year as a special edition, with Pokemon Yellow subsequently released three years later. Pokemon Fire Red and Leaf Green were remade afterwards for the Game Boy Advance in 2004 where upwards of 10 million copies were sold.",
    user_id: "",
  },
  {
    title: "Super Mario 64",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/mario64.jpg",
    description: "Published by Nintendo for its Nintendo 64 and released in June 23, 1996 Super Mario 64 sold over 11 million copies worldwide. The third-person, free roaming, 3D platform was the brainchild of Shigeru Miyamoto who had spent years trying to build a fully-3D platform for the SNES before he quit the idea altogether. However, when the company shifted to the development of N64, he played a big role in helping the company veer away from same thumb-destroying crosspads the company had been employing for over a decade.",
    user_id: "",
  },
  {
    title: "The Sims",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/sims.jpg",
    description: "Often considered the most successful video game series of all time, The Sims has sold more than 150 million copies worldwide as of May 2011. A strategic life simulation video game, it is also hailed as the best-selling PC franchise in history. The sandbox game was developed by Maxis, and was later turned over to The Sims Studio published by Electronic Arts. The gameplay involves creating virtual characters called ‘Sims’ who are placed in homes where players can direct their moods and satisfy their desires.",
    user_id: "",
  },
  {
    title: "Tetris",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/tetris.jpg",
    description: "Released in June 6, 1984, this tile-matching puzzle video game was created by Alexey Pajitnov, a young researcher at Moscow’s Academy of Science. The inspiration for this game came from a board game called Pentomino where 12 different shapes made out of five squares are twisted and turned until they all fit together in a box. Nowadays, an estimated billion people have played Tetris, the first entertainment software from the USSR that was exported to the US. This game is available on nearly all platforms helping it earn the topmost ranking on the  ‘100 Greatest Games of All Time’ list from the Electronic Gaming Monthly’s 100th issue.",
    user_id: "",
  },
  {
    title: "Nintendogs",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/nintendogs.jpg",
    description: "A real-time pet simulation video game developed for the Nintendo DS, Nintendogs has sold 23.64 million copies worldwide as of March 2011 since it was first released in Japan in 2005. The game uses the DS’s touchscreen and built-in microphone to pet a dog and to use various items. It also allows players to interact with others through the console’s wireless linkup. Nintendogs has received positive critical reception and has many awards including the 2006 Innovation Award from PC World.",
    user_id: "",
  },
  {
    title: "Final Fantasy VII",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/finalfantasy.jpg",
    description: "One of the best titles in the series, Final Fantasy VII became an immediate critical and commercial success when it was first released in 1997 for the Sony PlayStation. A version was also released in 1998 for Microsoft Windows PC and for the PlayStation Network in 2009. It sold 10 million copies by May 2010 and was highly popular as it was the first game in the series to be released using 3D computer graphics with fully-rendered characters on pre-rendered backgrounds. The first role-playing video game of the Final Fantasy series made available for European gamers, FFVII was lauded for its graphics, gameplay, music, and story, which led its publisher Square Enix to make a series of sequels and prequels using other platforms.",
    user_id: "",
  },
  {
    title: "Grand Theft Auto: Vice City",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/gtavc.jpg",
    description: "Considered to be the most visually stunning video game of the Grand Theft Auto Series, Vice City is the second 3D action-adventure video game that was developed by Rockstar North (DMA Design) in the UK in 2002. The same year, it became the best-selling video game of 2002 and the best-selling PlayStation 2 game of all time as well. After its debut for PlayStation 2, it was ported to Xbox and Microsoft Windows in 2003. It also became available on Steam in 2008 and the Mac App Store in 2011. For the game’s 10th anniversary celebration in December 2012, Rockstar released a new version of Vice City for iOS and other Android platforms.",
    user_id: "",
  },
  {
    title: "Half-Life 2",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/halflife2.jpg",
    description: "Half-Life 2 is a first-person shooting game like its predecessor and was originally released on November 16, 2004. It took five years of development, as the game was leaked and distributed on the internet, to complete the game. It was praised, however, for its gameplay, soundtracks, animation, storyline, and graphics when it was finally made public. It was also awarded “Game of the Decade” at the 2012 Video Game Awards. As of February of 2012, it already sold over 12 million copies, making it one of the best-selling PC games of all time.",
    user_id: "",
  },
  {
    title: "Starcraft",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/starcraft.jpg",
    description: "Starcraft is a real-time strategy based game first released in 1998 by Blizzard. Even though it was released 14 years ago, the game continues to leave a mark on the gaming world and is often considered to have  raised the bar for strategy-based games. As of 2009, the game sold over 9 million copies across the world.",
    user_id: "",
  },
  {
    title: "Resident Evil IV",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/residentevil4.jpg",
    description: "Initially created for GameCube, a PS2 version was announced before it was released. Various versions were also available for Microsoft Windows, Wii, PlayStation 3, and Xbox. The game pioneered the ‘over the shoulder’ third person point of view and was a top contender for the “2005 Game of the Year” award.",
    user_id: "",
  },
  {
    title: "Halo 2",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/halo2.jpg",
    description: "Developed by Bungie Studios and released on November 9, 2004 for Xbox, a Microsoft version was also released on May 31, 2007. The game uses a new physics engine called Havok and they added weapons, vehicles, and new multiplayer maps. With 6.3 million copies sold in U.S. alone, it is the best selling first generation Xbox game.",
    user_id: "",
  },
  {
    title: "Chrono Trigger",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/chronotrigger.jpg",
    description: "Released in 1995 and published by Square (known now as Square Enix) for the Super Nintendo Entertainment System, the Square also released a version for PlayStation in 1999 and a Nintendo DS Version in 2008. It was a huge success even upon release because of its character development, side quests, multiple endings, and its meticulous graphics, making it one of the greatest video games ever created.",
    user_id: "",
  },
  {
    title: "GoldenEye 007",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/goldeneye007.jpg",
    description: "A video game released for the Nintendo 64 in 1997, GoldenEye 007 became the party game of 1997 and 1998. It certainly has the propensity to end up on the best video games of all-time list due to its deathmatch mode, which paved the way for other multiplayer shooters.",
    user_id: "",
  },
  {
    title: "World of Warcraft",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/wow.jpg",
    description: "WoW is a massively multiplayer online role-playing game (MMORPG) released by Blizzard Entertainment in 1994 as the 4th installment game set in the fantasy Warcraft universe. It is hugely popular with over 12 million players worldwide and is currently the world’s most subscribed MMORPG.",
    user_id: "",
  },
  {
    title: "Doom",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/doom.jpg",
    description: "Doom was not the first first-person shooter video game, but when it comes to that genre, it was highly influential and significant. Without this seminal game, which was released by id software in 1993, that genre would not look like it does today. It was solely responsible for the word “deathmatch,” which is now a popular part of gaming lexicon and showed the full potential of the first-person shooter genre. Doom was leaps and bounds ahead of its time, and its legacy has persisted with a motion picture and a book chronicling the game’s development tailored for die hard fans yearning for the behind-the-scenes scoop.",
    user_id: "",
  },
  {
    title: "Super Metroid",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/supermetroid.jpg",
    description: "Also known as Metroid 3, this is an action-adventure game published for the Super Nintendo Entertainment System video game console in 1994. It was also released for the Wii Virtual Console in 2007 and a new version for the Wii U Virtual Console is schedule for release in May 2013. The game’s plot revolves around Samus Aran and her quests to retrieve a stolen Metroid from the Space Pirates. The game was universally acclaimed with an aggregated score of 96% from Game Rankings, named Game of the Month in 1994, received an Editor’s Choice Award as the Best Action Game of 1994, and ranked as one of the Best Games of All Time in 2003.",
    user_id: "",
  },
  {
    title: "Metal Gear Solid",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/mgs.jpg",
    description: "MGS, a stealth-action video game, was developed by Konami Computer Entertainment in 1988. It features impressive cinematic cutscenes and voice acting. However, what made this game hugely popular was the depth. The bosses were not just mere opponents but were well-crafted characters with their own personality, ideology, and will to fight. This is one of the greatest gaming franchises ever with more than six million copies sold and has spawned numerous sequels, prequels, and spinoffs aside from several games, radio drama, comics, and novels.",
    user_id: "",
  },
  {
    title: "Street Fighter II: The World Warrior",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/sf2.jpg",
    description: "A competitive fighting game that was originally released for the arcades in 1991, Street Fighter II was an improvement in many ways including the used of command-based special moves, a six-button configuration, and a selection of multiple playable characters with their own unique fighting styles. The success of Street Fighter II can be attributed to the game boom of the 1990s as well as the sub-series of updated versions. It exceeded $1.5 billion in gross revenues in 1993, had 25 million American playing the game in homes and arcades in 1994, and sold more than 14 million copies through its Super NES and Mega Drive console ports, making SF II Capcom’s best-selling game of all time.",
    user_id: "",
  },
  {
    title: "Call of Duty 4: Modern Warfare",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/cod4.jpg",
    description: "This game was hugely popular to gamers due to its cinematics, interactive gameplay, and highly polished mechanics, which made it one of the best competitive multiplayer games available out there. Published in 2007 by Activision, this first-person shooter video game uses a propriety game engine and was available in several platforms. It was the most highly acclaimed in the Call of Duty series and earned numerous awards including IGN’s Best Xbox 360 Game and the top-selling game worldwide in 2007 with 13 million copies sold as of May 2009.",
    user_id: "",
  },
  {
    title: "Sid Meier’s Civilization",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/civ.jpg",
    description: "This is a turn-based strategy video game that is the front-runner for all the 4X genre: eXplore, eXpand, eXploit, and eXterminate. Created for MicroProse in 1991, the game’s objective is ‘to build an empire that will stand the test of time.’ It requires the micromanagement skill of the players and though not as popular as Sims City, the game’s franchise has sold more than 8 million copies as of March 2008 with many of them produced by Sid Meier.",
    user_id: "",
  },
  {
    title: "Brain Age: Train Your Brain in Minutes a Day!",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/brainage.jpg",
    description: "Not all video games are created for fun and recreation as shown by Brain Age, an entertainment video game that uses puzzles such as stroop tests, mathematical questions, and Sudoku puzzles. It is an entertainment product that was based on the work of its creator, Dr. Kawashima, in neurosciences. It has received both commercial and critical success with 18.96 million copies sold as of March 2011 and even received multiple awards for its quality and innovation.",
    user_id: "",
  },
  {
    title: "Need for Speed",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/nfs.jpg",
    description: "NFS is the most successful racing video game ever with over 100 million copies sold as of October 2009. Considered one of the most successful video game franchises ever, it was first released in 1994 exclusively for 5th generation video game consoles, though it was eventually featured in all 7th generation consoles by 2008. A series of racing video games published by Electronics Arts, NFS was well-liked by racing maniacs not only for its speed, but also for the advanced graphics, car selection and modification, sound effects, and real-time car racing experience.",
    user_id: "",
  },
  {
    title: "Donkey Kong Country",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/dk.jpg",
    description: "This game not only brings back the Donkey Kong character, which was often viewed as a cult classic but also started a new franchise entry based on its new characters and gameplay. Developed by Rare in 1994, it sold over 9 million copies worldwide, making it the 2nd best-selling SNES game ever. Donkey Kong Country was the first game to use pre-rendered sprites, which create a 3D effect throughout the game. Its graphics were made from Silicon 3D graphic models compressed for 2D SNES that give its animations large amountsof detail for a 16-bit console, which was revolutionary at that time.",
    user_id: "",
  },
  {
    title: "Pac-Man",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Default",
    image: "/assets/game-images/pacman.jpg",
    description: "This classic game needs no introduction as it is still popular today and the name itself is nearly synonymous with video games. Developed in 1980, it became a staple of pop culture in that period and led to sales of countless merchandise, an animated TV series, and a top-ten hit single. Pac-Man is considered a landmark in video game history, the most famous arcade game of all time, and the highest-grossing video game ever with a generated income of $2.5 billion all before 1990.",
    user_id: "",
  },
];

const seeded = [{users: []}, {games: []}];


// ----------------------------------------
// | SEED ROUTES                          |
// ----------------------------------------

// creates users from newUsers and games from newGames
router.get('/seeding-users-and-games', (req, res) => {
  let salt = bcrypt.genSaltSync(10);
  // ----------
  for (let i = 0; i < newUsers.length; i++) {
    newUsers[i].password = bcrypt.hashSync(newUsers[i].password, salt);
    // ----------
    User.create(newUsers[i], (error, user) => {
      if (error) {
        res.send(error);
      } else {
        seeded[0].users.push(newUsers[i]);
        // ----------
        User.findOne({
          username: newUsers[i].username
        }, (error, foundUser) => {
          if (foundUser) {
            newGames[i].user_id = foundUser._id;
            // ----------
            Game.create(newGames[i], (error, game) => {
              if (error) {
                res.send(error);
              } else {
                seeded[1].games.push(newGames[i]);
              };
            }); // end game create
          } else {
            res.send(error);
          };
        });
      };
    }); // end user create
  }; // end for loop
  res.json(seeded);
}); // end seed users and games route


// ----------------------------------------
// | MODULE EXPORTS                       |
// ----------------------------------------
// Access this file in server.js          |
// Export router & require in server.js   |
// ----------------------------------------
module.exports = router;
