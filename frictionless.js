//contains some basic setup

var GAME_LEVELS = [
  ["                                                                                ",
   "                                                                                ",
   "                                                                                ",
   "                                                                                ",
   "                                                                                ",
   "                                                                                ",
   "                                                                  xxx           ",
   "                                                   xx      xx    xxxxx          ",
   "                                             xx                  xxxxx          ",
   "                                                                 xxxxx          ",
   "                                   xxxxx                          xxx           ",
   "                                                                            xx  ",
   "  xx                                                                         x  ",
   "  x                                                                          x  ",
   "  x                                      xxxxx                               x  ",
   "  x          xxxx                                                            x  ",
   "  x  @       x  x                                                xxxxx       x  ",
   "  xxxxxxxxxxxx  xxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxxxx     xxxxxxx   xxxxxxxxx  ",
   "                              x   x                  x     x                    ",
   "                              xxxxx                  xxxxxxx                    ",
   "                              xxxxx                  xxxxxxx                    ",
   "                              xxxxx                  xxxxxxx                    ",
   "                                                                                ",
   "                                                                                "],
  ["                                      xxxx                        xxxxxxx                                    xxx  ",
   "                                      xxxx                     xxxx     xxxx                                 xxx  ",
   "                                      xxxxxxxxxxxxx           xx           xx                                xxx  ",
   "                                      xxxxxxxxxxxxxx         xx             xx                               xxx  ",
   "                                       xxxxxxxxxxxxx         x                                               xxx  ",
   "                                                xxxx         x                                              xxxx  ",
   "                                                 xxx         x                                xxxxxxxxxxxxxxxxxx  ",
   "                                                 xxx         x     x   x                        xxxxxxxxxxxxxxxx  ",
   "                                                             xx             xx            xxxxxxxxxxxxxxxxxxxxx   ",
   "                                                              xxxxxxxxxxxxxxx            x                        ",
   "                                                               xxxxxxxxxxxxx                                      ",
   "                                               x     x            xxxxxxx        xxx         xxx                  ",
   "                                               x     x                           x x         x x                  ",
   "                                               x     x                             x         x                    ",
   "                                               x     x                             xx        x                    ",
   "                                               xx    x                             x         x                    ",
   "                                               x     x               x   x         x         x                    ",
   "               xxxxxxx        xxx   xxx        x     x               x   x         x         x                    ",
   "              xx     xx         x   x          x     x     xxxxxx    x   x   xxxxxxxxx       x                    ",
   "             xx       xx        x   x          x    xx               x   x   x               x                    ",
   "     @       x         x        x   x          x     x               x   x   x               x                    ",
   "    xxx      x         x        x   x          x     x               x   xxxxx   xxxxxx      x                    ",
   "    x x      x         x       xx   xx         x     x               x           x x         x                    ",
   "xxxxx xxxxxxxx         xxxxxxxxx     xxxxxxxxxxxx    xxxxxxxxxxx     x           x x         x                    ",
   "xxxxx xxxxxxxx         xxxxxxxx       xxxxxxxxxx     xxxxxxxxxxx     xxxxxxxxxxxxx xx       xx                    ",
   "xxxxx xxxxxxxx         xxxxxxx                      xxxxxxxxxx x                    xx     xx                     ",
   "xxxxx xxxxxxxx         xxxxxxx                     xxxxxxxxxx  x                     xxxxxxx                      ",
   "xxxxx xxxxxxxx         xxxxxxxx       xxxxxxxxxxxxxxxxxxxxxx   x                                                  ",
   "xxxxx xxxxxxxx         xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    x                                                  ",
   "xxxxx xxxxxxxx         xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx     x                                                  "],
  ["                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                        x                                                                     ",
   "                                        x                                                                     ",
   "                                        x                                                                     ",
   "                                        x                                                                     ",
   "                                       xxx                                                                    ",
   "                                       x x                 xxx        xxx  xxx                                ",
   "                                       x x                 xxx        xxx                                     ",
   "                                     xxx xxx                x          x                                      ",
   "                                      x   x                 x          x       xxx                            ",
   "                                      x   x                 x          x      xxxxx                           ",
   "                                      x   x                 xxxxxxxxxxxx       xxx                            ",
   "                                     xx   xx      x   x      x                                                ",
   "                                      x   xxxxxxxxx   xxxxxxxx              x x                               ",
   "                                      x   x           x                    xxxxx                              ",
   "                                      x   x           x                     xxx                               ",
   "                                     xx   xx          x                                                       ",
   "                                      x   x           x            xxx                                        ",
   "                                      x   x           x           xxxxx                                       ",
   "                                      x   x           x            xxx       xxx                              ",
   "                                     xx   xx          x                     xxxxx                             ",
   "                                      x   x           x     x                xxx        xxx                   ",
   "                                      x   x           x              x                 xxxxx                  ",
   "                             xxx xxx xxx xxx          xxxxxxxxxxxxxxxx                   xx                   ",
   "                             x xxx x x xxx x          xxxxxxxxxxxxxxxx                                        ",
   "                             x             x   xxxxxxxxxxxxxxxxxxxxxxx                                        ",
   "                             xx           xx                                         xxx                      ",
   "  xxx                         x     x     x                                         xxxxx                xxx  ",
   "  x x                         x    xxx    x                                          xxx                 x x  ",
   "  x                           x    xxx    xxxxxxx                        xxxxx                             x  ",
   "  x                           x           x                              x   x                             x  ",
   "  x                           xx          x                              x x x                             x  ",
   "  x                                       x        xxxx      xxxx      xxx xxx                             x  ",
   "  x                xxx                    x                              x         xxx                     x  ",
   "  x               xxxxx       xx          x                             xxx       xxxxx          x         x  ",
   "  x                xxx        x    xxx    x                             x x        xxx          xxx        x  ",
   "  x                xxx        xxxxxxxxxxxxx  x    x    x    x    x     xx xx                    xxx        x  ",
   "  x      @          x         x           xxxx    xxxxxx    xxxxxx    xx   xx                    x         x  ",
   "  xxxxxxxxxxxxxxxxxxxxxxxxxxxxx           xxxxxxxxxxxxxxxxxxxxxxxxxxxxx     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ",
   "                                                                                                              ",
   "                                                                                                              "],
  ["                                                                                                  xxx x       ",
   "                                                                                                      x       ",
   "                                                                                                  xxxxx       ",
   "                                                                                                  x           ",
   "                                                                                                  x xxx       ",
   "                                                                                                  x x x       ",
   "                                                                                                  xxx x       ",
   "                   xxx                                                                                x       ",
   "       x     x                                                xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx       ",
   "       x     x                                                x   x x   x x   x x   x x   x x   x x           ",
   "       x     x            x                                   xxx x xxx x xxx x xxx x xxx x xxx x xxxxx       ",
   "       x     x                                                  x x   x x   x x   x x   x x   x x     x       ",
   "       x     x                                               xxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxxxx       ",
   "                                                                                                              ",
   "                         xxx                              xx                                                  ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                      xx                                                      ",
   "                   xxx         xxx                                                                            ",
   "                                                                                                              ",
   "                                                                                x      x                      ",
   "                                                          xx     xx                                           ",
   "             xxx         xxx         xxx                                 x                  x                 ",
   "                                                                                                              ",
   "                                                                                                              ",
   "  xxxxxxxxxxx                                                                                                 ",
   "  x         x   xxxxxxxxx   xxxxxxxxx   xx                                                x                   ",
   "  x         x   x       x   x       x   x                                     x     x                         ",
   "  x  @      xxxxx       xxxxx       xxxxx                                                                     ",
   "  xxxxxxx                                     xxxxx       xx     xx     xxx                                   ",
   "        x                                     x   x                     xxx                                   ",
   "        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
   "                                                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
   "                                                                                                              "]
];