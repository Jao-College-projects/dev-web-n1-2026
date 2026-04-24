import type { Transition, Variants } from "framer-motion";

export const easeEditorial: Transition = {
  duration: 1.15,
  ease: [0.22, 1, 0.36, 1],
};

export const staggerChildren: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.2,
    },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: easeEditorial,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { ...easeEditorial, duration: 0.9 },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeEditorial,
  },
};

export const staggerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.1,
    },
  },
};
