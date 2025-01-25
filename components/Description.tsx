import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../components/variants";
import { useInView } from "react-intersection-observer";

const Description = () => {
    const [ref1, inView1] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [ref2, inView2] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return ( 
        <div className='w-full flex flex-col p-4 gap-y-6 items-center overflow-hidden'>
            <div className='w-3/4 h-7 mx-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-600 rounded-xl'></div>
            <div className='w-full h-full md:w-4/5 lg:w-3/5 flex flex-col gap-y-6'>
                <motion.div
                ref={ref1}
                variants={fadeIn("right", 0.3)}
                initial="hidden"
                animate={inView1 ? "show" : "hidden"}
                exit="hidden" className='w-4/5 h-1/2  ml-3 mr-auto'>
                    <div className='w-full h-full'>
                        <h2 className='font-bold text-2xl lg:text-3xl'>
                            Czym jest MAPA<span className='text-yellow-400'>.</span> Kebabów?
                        </h2>
                        <p className='mt-4 p-3 md:text-lg lg:text-xl'>
                            MAPA. Kebabów to interaktywna mapa internetowa, która pozwala odkryć wszystkie kebaby w Trójmieście. Znajdziesz na niej opinie klientów, oceny, godziny otwarcia oraz inne ważne informacje, dzięki którym łatwo wybierzesz najlepsze miejsce na kebab. To idealne narzędzie dla miłośników szybkiego, smacznego jedzenia!
                        </p>
                    </div>
                </motion.div>
                <motion.div
                ref={ref2}
                variants={fadeIn("left", 0.3)}
                initial="hidden"
                animate={inView2 ? "show" : "hidden"}
                exit="hidden" className='w-4/5 h-1/2 ml-auto mr-3 mt-4'>
                    <div className='w-full h-full'>
                        <h2 className='font-bold text-2xl lg:text-3xl'>
                            Dlaczego właśnie my<span className='text-yellow-400'>?</span>
                        </h2>
                        <p className='mt-4 p-3 md:text-lg lg:text-xl'>
                            Bo to najszybszy i najprostszy sposób, by znaleźć najlepszy kebab w Trójmieście! Dzięki opiniom, ocenom i praktycznym informacjom oszczędzasz czas i zawsze trafiasz w kulinarne dziesiątki. Smacznie, łatwo i lokalnie!
                        </p>
                </div>
            </motion.div>
            </div>
            <div className='w-3/4 h-7 mx-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-600 rounded-xl'></div>
        </div>
    );
}
 
export default Description ;