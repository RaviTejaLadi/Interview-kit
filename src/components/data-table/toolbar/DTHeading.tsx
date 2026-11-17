type DTHeadingProps = {
  heading: string;
  description?: string;
};

export function DTHeading({ heading, description }: DTHeadingProps) {
  return (
    <div className="my-3">
      <h2 className="ml-1 flex w-full items-center truncate font-heading text-xl font-semibold text-foreground">
        {heading}
      </h2>
      {description ? <p className="ml-1 text-muted-foreground">{description}</p> : null}
    </div>
  );
}
