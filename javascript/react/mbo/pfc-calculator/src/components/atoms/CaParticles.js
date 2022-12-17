import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Box } from '@mui/material'


const CaParticles = () => {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, [])
  console.log('render particle ')

  return (
    <Box className="ca-particles">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          interactivity: {
            events: {
              onClick: {
                enable: false,
              },
              onHover: {
                enable: false,
              },
              resize: true,
            },
          },
          particles: {
            collisions: {
              enable: false,
            },
            move: {
              direction: 'top',
              enable: true,
              bounce: false,
              outModes: {
                default: 'out',
              },
              random: false,
              speed: 4,
              straight: false,
            },
            number: {
              density: {
                enable: false,
                area: 0,
              },
              value: 40,
            },
            opacity: {
              value: 0.5,
              random: true,
            },
            shape: {
              type: 'image',
              image: {
                src: '/logo192.png',
              }
            },
            size: {
              value: { min: 30, max: 70 },
              random: true,
            },
          },
          detectRetina: true,
        }}
      />
    </Box>
  )
}

export default CaParticles
