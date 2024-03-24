import { Check, X } from "@phosphor-icons/react";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import scss from "./passwordGuide.module.scss";
import { AnimatePresence, motion } from "framer-motion";

const passwordGuides = [
  { label: "must contain lowercase letter", itPassed: false },
  { label: "must contain uppercase letter", itPassed: false },
  { label: "must contain number", itPassed: false },
  { label: "must contain a special character, e.g: !@$?", itPassed: false },
];
function PasswordGuide(props: { shouldShow: boolean; password: string }) {
  const [passwordGuide, setPasswordGuide] = useState(passwordGuides);

  useEffect(() => {
    const lowercaseRegex = /[a-z]/g;
    const uppercaseRegex = /[A-Z]/g;
    const numberRegex = /\d/g;
    const specialCharacterRegex = /(\W)/g;

    if (lowercaseRegex.test(props.password)) {
      setPasswordGuide((prevObjects) => {
        return prevObjects.map((object) => {
          if (object.label.includes("lowercase")) {
            return { ...object, itPassed: true };
          }
          return object;
        });
      });
    } else {
      setPasswordGuide((prevObjects) => {
        return prevObjects.map((object) => {
          if (object.label.includes("lowercase")) {
            return { ...object, itPassed: false };
          }
          return object;
        });
      });
    }

    if (uppercaseRegex.test(props.password)) {
      setPasswordGuide((prevObjects) => {
        return prevObjects.map((object) => {
          if (object.label.includes("uppercase")) {
            return { ...object, itPassed: true };
          }
          return object;
        });
      });
    } else {
      setPasswordGuide((prevObjects) => {
        return prevObjects.map((object) => {
          if (object.label.includes("uppercase")) {
            return { ...object, itPassed: false };
          }
          return object;
        });
      });
    }

    if (numberRegex.test(props.password)) {
      setPasswordGuide((prevObjects) => {
        return prevObjects.map((object) => {
          if (object.label.includes("number")) {
            return { ...object, itPassed: true };
          }
          return object;
        });
      });
    } else {
      setPasswordGuide((prevObjects) => {
        return prevObjects.map((object) => {
          if (object.label.includes("number")) {
            return { ...object, itPassed: false };
          }
          return object;
        });
      });
    }

    if (specialCharacterRegex.test(props.password)) {
      setPasswordGuide((prevObjects) => {
        return prevObjects.map((object) => {
          if (object.label.includes("special")) {
            return { ...object, itPassed: true };
          }
          return object;
        });
      });
    } else {
      setPasswordGuide((prevObjects) => {
        return prevObjects.map((object) => {
          if (object.label.includes("special")) {
            return { ...object, itPassed: false };
          }
          return object;
        });
      });
    }
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
            <p>{guide.label}</p>
          </motion.div>
        ))}
    </AnimatePresence>
  );
}

export default PasswordGuide;
