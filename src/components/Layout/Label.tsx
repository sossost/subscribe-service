import classes from "./Label.module.css";

interface LabelProps {
  label: string;
}

const Label = ({ label }: LabelProps) => {
  return (
    <div className={classes.label}>
      <h3>{label}</h3>
    </div>
  );
};

export default Label;
