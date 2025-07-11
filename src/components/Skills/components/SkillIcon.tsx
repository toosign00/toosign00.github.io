import {
  SiAdobeillustrator,
  SiAdobeindesign,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiCss3,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiReact,
  SiSass,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
import figmaLogo from '@/assets/icon/figma.svg';

import viteLogo from '@/assets/icon/vite.svg';
import type { SkillIconProps } from '@/types/skills.type';

export const SkillIcon = ({ skill }: SkillIconProps) => {
  const iconMap: Record<string, React.ReactNode> = {
    SiHtml5: <SiHtml5 style={{ color: skill.color }} />,
    SiCss3: <SiCss3 style={{ color: skill.color }} />,
    SiSass: <SiSass style={{ color: skill.color }} />,
    SiJavascript: <SiJavascript style={{ color: skill.color }} />,
    SiTypescript: <SiTypescript style={{ color: skill.color }} />,
    SiReact: <SiReact style={{ color: skill.color }} />,
    SiTailwindcss: <SiTailwindcss style={{ color: skill.color }} />,
    SiNodedotjs: <SiNodedotjs style={{ color: skill.color }} />,
    SiMongodb: <SiMongodb style={{ color: skill.color }} />,
    SiSupabase: <SiSupabase style={{ color: skill.color }} />,
    SiVercel: <SiVercel style={{ color: skill.color }} />,
    SiGit: <SiGit style={{ color: skill.color }} />,
    SiGithub: <SiGithub style={{ color: skill.color }} />,
    SiAdobephotoshop: <SiAdobephotoshop style={{ color: skill.color }} />,
    SiAdobeillustrator: <SiAdobeillustrator style={{ color: skill.color }} />,
    SiAdobeindesign: <SiAdobeindesign style={{ color: skill.color }} />,
    SiAdobepremierepro: <SiAdobepremierepro style={{ color: skill.color }} />,
    viteLogo: <img src={viteLogo} alt='Vite' className='h-6 w-6' />,
    figmaLogo: <img src={figmaLogo} alt='Figma' className='h-6 w-6' />,
  };

  return <>{iconMap[skill.iconName]}</>;
};
