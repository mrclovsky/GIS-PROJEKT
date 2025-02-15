import {motion} from 'framer-motion'

const transitionVariants = {
  initial: {
    x: '100%',
    width: '100%',
  },
  animate: {
    x: '0%',
    width: '0%',
  },
  exit: {
    x: ['0%', '100%'],
    width: ['0%', '100%'],
  }
}

const Transition = () => {
  return (
    <>
      <motion.div className='fixed top-0 bottom-0 right-full w-screen h-screen z-50 
      bg-[#fef9c3]' variants={transitionVariants} initial='initial' animate='animate'
      exit='exit' transition={{delay: 0.3, duration: 0.9, ease: 'easeInOut'}} ></motion.div>

      <motion.div className='fixed top-0 bottom-0 right-full w-screen h-screen z-40 
      bg-[#fde68a]' variants={transitionVariants} initial='initial' animate='animate'
      exit='exit' transition={{delay: 0.6, duration: 0.9, ease: 'easeInOut'}} ></motion.div>

      <motion.div className='fixed top-0 bottom-0 right-full w-screen h-screen z-30 
      bg-[#fcd34d]' variants={transitionVariants} initial='initial' animate='animate'
      exit='exit' transition={{delay: 0.9, duration: 0.9, ease: 'easeInOut'}} ></motion.div>
    </>
  );
};

export default Transition;
