import { Check, X } from "@phosphor-icons/react";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import scss from "./passwordGuide.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { PasswordGuideProps } from "./passwordGuide.type";

const passwordGuides = [
  { label: "must contain lowercase letter", itPassed: false },
  { label: "must contain uppercase letter", itPassed: false },
  { label: "must contain number", itPassed: false },
  { label: "must contain a special character, e.g: !@$?", itPassed: false },
];

function PasswordGuide(props: PasswordGuideProps) {
  const [passwordGuide, setPasswordGuide] = useState(passwordGuides);

  useEffect(() => {
    const validations = [
      { regex: /[a-z]/g, label: "lowercase" },
      { regex: /[A-Z]/g, label: "uppercase" },
      { regex: /\d/g, label: "number" },
      { regex: /\W/g, label: "special" },
    ];

    setPasswordGuide((prevObjects) => {
      return prevObjects.map((object) => {
        const validation = validations.find((validations) =>
          object.label.includes(validations.label),
        );

        if (validation) {
          const itPassed = validation.regex.test(props.password);
          return { ...object, itPassed };
        }

        return object;
      });
    });
  }, [props.password]);

  const allGuidesComplete = useMemo(() => {
    return passwordGuide.every((guides) => guides.itPassed === true);
  }, [passwordGuide]);

  return (
    <AnimatePresence mode="wait">
      {props.shouldShow &&
        !allGuidesComplete &&
        passwordGuide.map((guide) => (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "tween",
              layout: { delay: 0.3 },
            }}
            className={classNames([scss.guides], {
              [scss.green]: guide.itPassed,
              [scss.red]: !guide.itPassed,
            })}
          >
            {guide.itPassed ? <Check size={32} /> : <X size={32} />}
            <p
              className={classNames({
                [scss.green]: guide.itPassed,
                [scss.red]: !guide.itPassed,
              })}
            >
              {guide.label}
            </p>
          </motion.div>
        ))}
    </AnimatePresence>
  );
}

export default PasswordGuide;
