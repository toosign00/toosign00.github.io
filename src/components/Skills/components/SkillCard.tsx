import type { SkillCardProps } from '@/types/skills.type';
import { motion } from 'framer-motion';
import { Tooltip } from './Tooltip';
import { SkillIcon } from './SkillIcon';
import { skillItemVariants } from '@/motion/skillAnimations';

export const SkillCard = ({ skill, filter }: SkillCardProps) => {
  return (
    <motion.div
      key={`${skill.name}-${filter}`}
      variants={skillItemVariants}
      layout
      className="flex w-full justify-center"
    >
      <Tooltip content={skill.name}>
        <motion.div
          className="focus:ring-blue border-gray bg-ui-background flex h-16 w-16 flex-col items-center justify-center rounded-2xl border backdrop-blur-md transition-all duration-300 focus:outline-none focus-visible:ring-2 md:h-20 md:w-20"
          whileTap={{ scale: 0.95 }}
          tabIndex={0}
          role="button"
          aria-label={`${skill.name} 기술 스택`}
        >
          <div className="text-2xl md:text-3xl">
            <SkillIcon skill={skill} />
          </div>
        </motion.div>
      </Tooltip>
    </motion.div>
  );
};
