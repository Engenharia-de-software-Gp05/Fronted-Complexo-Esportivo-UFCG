import React, { useCallback, useState } from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import classNames from "clsx";
import {
  TITLE_TEXT_EDITOR,
  MULTILINE_TEXT_EDITOR,
  TITLE,
} from "@devexpress/dx-scheduler-core";

const PREFIX = "Layout";

export const classes = {
  root: `${PREFIX}-root`,
  fullSize: `${PREFIX}-fullSize`,
  halfSize: `${PREFIX}-halfSize`,
  labelWithMargins: `${PREFIX}-labelWithMargins`,
  notesEditor: `${PREFIX}-notesEditor`,
  dateEditor: `${PREFIX}-dateEditor`,
  dividerLabel: `${PREFIX}-dividerLabel`,
  booleanEditors: `${PREFIX}-booleanEditors`,
  dateEditors: `${PREFIX}-dateEditors`,
};

const Layout = ({
  children,
  locale,
  className,
  getMessage,
  readOnly,
  onFieldChange,
  appointmentData,
  fullSize,
  resources,
  appointmentResources,
  textEditorComponent: TextEditor,
  dateEditorComponent: DateEditor,
  selectComponent: Select,
  labelComponent: Label,
  booleanEditorComponent: BooleanEditor,
  resourceEditorComponent: ResourceEditor,
  ...restProps
}) => {
  const [useDefaultStartDate, setUseDefaultStartDate] = useState(true);
  const [defaultStartDate, setDefaultStartDate] = useState(
    appointmentData.startDate,
  );
  const [defaultEndDate, setDefaultEndDate] = useState(
    new Date(defaultStartDate.getTime() + 2 * 60 * 60 * 1000),
  );

  const changeTitle = useCallback(
    (title) => onFieldChange({ title }),
    [onFieldChange],
  );
  const changeNotes = useCallback(
    (notes) => onFieldChange({ notes }),
    [onFieldChange],
  );
  const changeStartDate = useCallback(
    (startDate) => {
      setUseDefaultStartDate(false);
      const newEndDate = new Date(startDate);
      newEndDate.setHours(startDate.getHours() + 2);
      onFieldChange({ startDate });
      onFieldChange({ endDate: newEndDate });
    },
    [onFieldChange],
  );
  const changeResources = useCallback(
    (resource) => onFieldChange(resource),
    [onFieldChange],
  );

  return (
    <div
      className={classNames(
        {
          [classes.root]: true,
          [classes.fullSize]: fullSize,
          [classes.halfSize]: !fullSize,
        },
        className,
      )}
      {...restProps}
    >
      <Label text={getMessage("detailsLabel")} type={TITLE} />
      <TextEditor
        placeholder={getMessage("titleLabel")}
        readOnly={readOnly}
        type={TITLE_TEXT_EDITOR}
        value={appointmentData.title}
        onValueChange={changeTitle}
      />
      <Grid
        container
        alignItems="center"
        gap={2}
        className={classes.dateEditors}
      >
        <DateEditor
          className={classes.dateEditor}
          readOnly={readOnly}
          value={
            useDefaultStartDate ? defaultStartDate : appointmentData.startDate
          }
          onValueChange={changeStartDate}
          locale={locale}
          excludeTime={appointmentData.allDay}
        />
        <Label text="-" className={classes.dividerLabel} />
        <DateEditor
          className={classes.dateEditor}
          readOnly={true}
          value={useDefaultStartDate ? defaultEndDate : appointmentData.endDate}
          locale={locale}
          excludeTime={appointmentData.allDay}
        />
      </Grid>
      <Label
        text={getMessage("moreInformationLabel")}
        type={TITLE}
        className={classes.labelWithMargins}
      />
      <TextEditor
        placeholder={getMessage("notesLabel")}
        readOnly={readOnly}
        type={MULTILINE_TEXT_EDITOR}
        value={appointmentData.notes}
        onValueChange={changeNotes}
        className={classes.notesEditor}
      />
      {resources.map((resource) => (
        <React.Fragment key={resource.fieldName}>
          <ResourceEditor
            label={resource.title}
            readOnly={readOnly}
            resource={resource}
            appointmentResources={appointmentResources}
            onResourceChange={changeResources}
          />
        </React.Fragment>
      ))}

      {children}
    </div>
  );
};

Layout.propTypes = {
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    .isRequired,
  dateEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    .isRequired,
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    .isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    .isRequired,
  booleanEditorComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  resourceEditorComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  locale: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  getMessage: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func,
  appointmentData: PropTypes.shape({
    userId: PropTypes.number,
    title: PropTypes.string,
    startDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    endDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    rRule: PropTypes.string,
    notes: PropTypes.string,
    additionalInformation: PropTypes.string,
  }).isRequired,
  resources: PropTypes.array,
  appointmentResources: PropTypes.array,
  readOnly: PropTypes.bool,
  fullSize: PropTypes.bool.isRequired,
};

Layout.defaultProps = {
  onFieldChange: () => undefined,
  resources: [],
  appointmentResources: [],
  className: undefined,
  readOnly: false,
  children: null,
};

export default Layout;
