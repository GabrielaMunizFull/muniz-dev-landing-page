import { motion } from 'framer-motion';

export function WordReveal({
  text,
  className,
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'span';
}) {
  const words = text.split(' ');
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span className="word-reveal" key={`${word}-${i}`}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
