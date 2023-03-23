import { MosaicObject } from "@root/types";
import { ActionAdditional, DataViewColumnTransform } from "../DataView";
import { SectionDef } from "../Form/FormTypes";
import { ButtonProps } from "@root/components/Button";

export interface ContentField {
  /**
   * The name of the field is used to check if
   * is a valid compared with the sections.
   */
  name: string;
  /**
   * The label is render above of the component.
   */
  label: React.ReactNode;
  /**
   * Functions which will receive raw data that will be use to render
   * a component.
   */
  transforms?: DataViewColumnTransform[];
  /**
   * A value or array of values or function or array of functions that
   * controlls whether or not to display a field.
   */
  show?: ActionAdditional["show"];
  /**
   * If a column is given then it will be used as the name, hence
   * defaults to name.
   */
  column?: string;
}

export interface ContentProps {
  /**
   * List of the definitions of the fields that will be render.
   */
  fields: ContentField[];
  /**
   * Data that will be used by the transform function of each
   * field to generate the corresponding JSX element.
   */
  data: MosaicObject;
  /**
   * Includes the configuration of where each field is going to be
   * render. Fields will be render in a max of two columns.
   */
  sections?: SectionDef["fields"];
  /**
   * Name of the section or subsection.
   */
  title: string;
  /**
   * Configuration of the list of buttons that appear at the top
   * of the component.
   */
  buttons?: ButtonProps[];
  /**
   * Variant of the component defines what styles should render
   * if "card" is passed, content component looks like a card component
   */
  variant?: "standard" | "card";
}
