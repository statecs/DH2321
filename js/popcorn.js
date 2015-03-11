
VIDEO = {

    videoObject: '#ourvideo',
    subtitleID: 0,

    addSubtitle: function (start, end, subtitle) {
        wrapperId = 'subtitle-' + this.subtitleID;
        this.subtitleID += 1;
        //add the subtitle
        Popcorn(this.videoObject).cue(start, function () {
            VIDEO.displaySubtitle(subtitle, wrapperId);
        });
        //remove the subtitle
        Popcorn(this.videoObject).cue(end, function () {
            VIDEO.removeSubtitle(wrapperId);
        });
    },

    displaySubtitle: function (subtitle, wrapperId) {
        document.getElementById('infoWrapper').innerHTML = '<p id="' + wrapperId + '">' + subtitle + '</p>' + document.getElementById('infoWrapper').innerHTML;
    },

    removeSubtitle: function (wrapperId) {
        element = document.getElementById(wrapperId);
        element.parentNode.removeChild(element);
    }

};

document.addEventListener("DOMContentLoaded", function () {

    VIDEO.addSubtitle(9, 11, 'You Jack Sully?');
    VIDEO.addSubtitle(12, 16, 'I\'d like to talk to you about a fresh start, in a new world...');
    VIDEO.addSubtitle(17, 19, '...you\'d be making a difference');
    VIDEO.addSubtitle(23, 25.5, 'I became a marine for the hardship');
    VIDEO.addSubtitle(25.6, 29, 'I told myself I can pass any test a man can pass');
    VIDEO.addSubtitle(29.1, 31.5, 'All I ever wanted, was a single thing worth fighting for');
    VIDEO.addSubtitle(31.6, 33, 'Ladies and gentlemen...');
    VIDEO.addSubtitle(34, 38, '...you\'re not in Kansas anymore...');
    VIDEO.addSubtitle(38.1, 40, '...you\'re on Pandora');
    VIDEO.addSubtitle(40.5, 43, 'You should see your faces');
    VIDEO.addSubtitle(43.1, 46, 'We have an indigenous population called the Na\'vi...');
    VIDEO.addSubtitle(46.5, 49, '...they are very hard to kill');
    VIDEO.addSubtitle(49, 51, 'This is why we\'re here...');
    VIDEO.addSubtitle(50, 54, 'because this little grey rock sells for 20 million a kilo');
    VIDEO.addSubtitle(53, 59, 'Their village, happens to be resting on the richest deposit and they need to relocate');
    VIDEO.addSubtitle(59.1, 61, 'Those savages are threatening our whole operation');
    VIDEO.addSubtitle(61.1, 65, 'We\'re on the brink of war and your supposed to be finding a diplomatic solution');
    VIDEO.addSubtitle(67.5, 74, 'The concept is to drive these remotely controlled bodies called Avatars');
    VIDEO.addSubtitle(73, 77, 'They grow them from human DNA, mixed with DNA of the natives');
    VIDEO.addSubtitle(78, 82, 'Marine in an Avatar body, that\'s a potent mix');
    VIDEO.addSubtitle(82.1, 84, 'You get me what I need I\'ll see to it you get your legs back...');
    VIDEO.addSubtitle(85, 87, '...your real legs');
    VIDEO.addSubtitle(87.1, 89, 'Hell yeh, sir!');
    VIDEO.addSubtitle(88, 90, 'Looks like you');
    VIDEO.addSubtitle(90.1, 92, 'This is your Avatar');
    VIDEO.addSubtitle(92.1, 94, 'Just relax and let your mind go blank...');
    VIDEO.addSubtitle(95, 97, '...shouldn\'t be hard for you');
    VIDEO.addSubtitle(103, 104, '*gasp*');
    VIDEO.addSubtitle(105, 106, 'Wahooooo');
    VIDEO.addSubtitle(110, 112, 'Jake, it\'s real simple...');
    VIDEO.addSubtitle(114, 118, '...I want you to learn from the inside, I want you to gain their trust');
    VIDEO.addSubtitle(122, 124, 'You should not be here');
    VIDEO.addSubtitle(125, 127, 'Go back!');
    VIDEO.addSubtitle(127.5, 130, 'Well this is your fault');
    VIDEO.addSubtitle(131, 133, 'I need your help');
    VIDEO.addSubtitle(138, 139, 'Outstanding');
    VIDEO.addSubtitle(145, 148, 'Haven\'t got lost in the woods have ya?');
    VIDEO.addSubtitle(147, 150, 'You forget what team you\'re playing for?');
    VIDEO.addSubtitle(151, 154, 'The strong prey on the weak and nobody does a thing');
    VIDEO.addSubtitle(155, 157, 'You\'ve got 1 hour');
    VIDEO.addSubtitle(157.1, 159, 'You knew this would happen?');
    VIDEO.addSubtitle(158, 160, 'I\'ve been changed');
    VIDEO.addSubtitle(160.1, 161, 'Jake it\'s crazy here...');
    VIDEO.addSubtitle(161.1, 165, '...Forman is just rolling and their is no stopping him');
    VIDEO.addSubtitle(165, 168, 'They\'re going up against gunships with bows and arrows');
    VIDEO.addSubtitle(168.1, 170, 'Then I guess we\'d better stop him');
    VIDEO.addSubtitle(183, 185, 'They\'ve sent us a message...');
    VIDEO.addSubtitle(186, 189, '...that they can take whatever they want');
    VIDEO.addSubtitle(189.1, 191, 'But we will send them a message...');
    VIDEO.addSubtitle(192, 194, '...THAT THIS...');
    VIDEO.addSubtitle(194.5, 197, '...THIS IS OUR LAND!');

}, false);