import Sidebar from "../components/molecules/Sidebar"
import Preloader from '../components/atoms/Preloader'
import { Button } from 'antd'
import MobileNavigation from "../components/molecules/MobileNavigation"

const ExplorePage = () => {
    const games = [
        {
            gameName: "Call of Duty (Zombie)",
            gameScreenShot: "https://user-images.githubusercontent.com/2433219/94984424-044e0a80-0509-11eb-903a-c114d5b6f061.png",
            gameLink: "/games/call-of-duty.html"
        },
        {
            gameName: "Deer Hunting",
            gameScreenShot: "https://user-images.githubusercontent.com/2433219/94984424-044e0a80-0509-11eb-903a-c114d5b6f061.png",
            gameLink: "/games/deer-hunting.html"
        },
        {
            gameName: "Snake Game",
            gameScreenShot: "https://user-images.githubusercontent.com/2433219/94984424-044e0a80-0509-11eb-903a-c114d5b6f061.png",
            gameLink: "/games/snake.html"
        },
        {
            gameName: "Pac Man",
            gameScreenShot: "/images/pacman.png",
            gameLink: "/games/pacman/index.html"
        },
        {
            gameName: "Racing Car",
            gameScreenShot: "/images/racer.png",
            gameLink: "/games/racing-car/index.html"
        },
        {
            gameName: "Lost In Cave",
            gameScreenShot: "/images/triangle.png",
            gameLink: "/games/triangle/index.html"
        },
        {
            gameName: "Bar",
            gameScreenShot: "/images/bar.png",
            gameLink: "/games/bar.html"
        },
        {
            gameName: "Breakout",
            gameScreenShot: "/images/breakout.png",
            gameLink: "/games/breakout.html"
        },
        {
            gameName: "Racing Car 2",
            gameScreenShot: "/images/race2.png",
            gameLink: "/games/car-racing.html"
        },
        {
            gameName: "Crazy Pirates",
            gameScreenShot: "/images/pirates.png",
            gameLink: "/games/crazy-pirates.html"
        },
        {
            gameName: "Doodle Jump",
            gameScreenShot: "/images/doodle.png",
            gameLink: "/games/doodlejump.html"
        },
        {
            gameName: "Egg catching",
            gameScreenShot: "/images/egg.png",
            gameLink: "/games/egg-catching.html"
        },
        {
            gameName: "Aviator",
            gameScreenShot: "/images/egg.png",
            gameLink: "/games/aviator/index.html"
        },
        {
            gameName: "Flappy bird",
            gameScreenShot: "/images/bird.png",
            gameLink: "/games/fly-bird.html"
        },
        {
            gameName: "Crash Helicopter",
            gameScreenShot: "/images/copter.png",
            gameLink: "/games/helicopter.html"
        },
        {
            gameName: "Missiles",
            gameScreenShot: "/images/missile.png",
            gameLink: "/games/missile.html"
        },
        {
            gameName: "Go Platformer",
            gameScreenShot: "/images/go.png",
            gameLink: "/games/platformer.html"
        },
        {
            gameName: "Puzzle Bubble",
            gameScreenShot: "/images/bubble.png",
            gameLink: "/games/puzzlebubble.html"
        },
        {
            gameName: "Sokoban",
            gameScreenShot: "/images/sokoban.png",
            gameLink: "/games/sokoban.html"
        },
        {
            gameName: "Tetris",
            gameScreenShot: "/images/tetris.png",
            gameLink: "/games/tetris.html"
        },
        {
            gameName: "Ninja Up",
            gameScreenShot: "/images/ninja.png",
            gameLink: "/games/up-platformer.html"
        },
    ]
  return (
    <div className='flex flex-row min-h-screen'>
        <MobileNavigation />
        {/* preloader */}
        <Preloader />
        {/* preloader */}
        <Sidebar />
        <div className='md:ml-[200px] p-[20px] md:p-[50px] bg-[#000] w-full md:flex-1'>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {games.map((game, index) => (
                    <div key={index} className='h-[300px] pt-[10px] overflow-hidden mt-[20px] relative'>
                        <img src={game.gameScreenShot} className='w-full h-full rounded-[15px] object-center' alt={game.gameName} />
                        <div className='absolute w-full glassy p-[10px] bottom-0 left-0 right-0'>
                            <p className='font-afacadFlux font-black uppercase select-none cursor-pointer text-center text-[14px]'>Game Name: {game.gameName}</p>
                            <a href={game.gameLink} target='_blank'>
                                <Button className='bg-sky-400 font-afacadFlux mt-[5px] w-full fonnt-bold border-[0px] text-[#fff]'>Launch Game</Button>
                            </a>
                        </div>
                    </div>
                ))}
            </div>

        </div>

    </div>
  )
}

export default ExplorePage
