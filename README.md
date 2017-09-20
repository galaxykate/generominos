# Generominos
Creative ideation cards for generative frameworks

## Motivation

This is a project by @galaxykate Kate Compton to create a deck of cards to design generative interactive artworks and games.  It's been playtested by lots of patient people.  You can read more, including academic papers, user studies, and sample projects at [www.galaxykate.com/generonimos](http://www.galaxykate.com/generonimos)

### What should I do with this?

You can print out the latest version, ``generominos.pdf`` and start playing.

You could also start editing and adding your own cards. Add new cards to ``data-cards.js``, new scenario cards to ``data-scenarios.js`` or even new data types to ``data-datatypes.js`` (instructions in those files).  Cards are generated completely dynamically based on the data in those files.

These cards are designed to be the correct size to upload to [http://www.makeplayingcards.com/](http://www.makeplayingcards.com/).  You can use the Node script ``puppeteer.js`` in the ``imagecapture`` folder to automatically output all the cards to PNG files (requires Chrome Puppeteer).  Or you can save them as a PDF and cut them out yourself.

Made something cool with these?  Ping @galaxykate, I love to hear about new projects.