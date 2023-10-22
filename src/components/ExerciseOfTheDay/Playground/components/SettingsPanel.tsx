import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import React, { useEffect, useId } from "react";

const SettingsPanel = (): JSX.Element => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [category, setCategory] = React.useState<string | null>(null);

  useEffect(() => {
    const category = localStorage.getItem("category");
    if (category) {
      setCategory(category);
    }
  }, []);

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

  const { getReferenceProps, getFloatingProps } = useInteractions([click, role, dismiss]);

  const headingId = useId();
  const descriptionId = useId();

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()} className="signout">
        ⚙️
      </button>
      <FloatingPortal>
        {isOpen && (
          <FloatingOverlay className="Dialog-overlay" lockScroll>
            <FloatingFocusManager context={context}>
              <>
                <div
                  className="Dialog"
                  ref={refs.setFloating}
                  aria-labelledby={headingId}
                  aria-describedby={descriptionId}
                  {...getFloatingProps()}
                >
                  <i onClick={() => setIsOpen(false)} className="gg-close"></i>
                  <h2 style={{ marginTop: 0 }}>Settings</h2>
                  <fieldset>
                    <legend>Choose categories:</legend>

                    <div>
                      <input
                        checked={category === null}
                        type="radio"
                        id="array"
                        name="All"
                        onChange={(event) => {
                          if (event.target.checked) {
                            setCategory(null);
                            localStorage.removeItem("category");
                          }
                        }}
                      />
                      <label htmlFor="array">All</label>
                    </div>

                    <div>
                      <input
                        checked={category === "Javascript Array Methods"}
                        type="radio"
                        id="array"
                        name="Javascript Array Methods"
                        onChange={(event) => {
                          if (event.target.checked) {
                            setCategory(event.target.name);
                            localStorage.setItem("category", event.target.name);
                          } else {
                            setCategory(null);
                            localStorage.removeItem("category");
                          }
                        }}
                      />
                      <label htmlFor="array">Javascript Array Methods</label>
                    </div>

                    <div>
                      <input
                        checked={category === "JavaScript Promises"}
                        type="radio"
                        id="promises"
                        name="JavaScript Promises"
                        onChange={(event) => {
                          if (event.target.checked) {
                            setCategory(event.target.name);
                            localStorage.setItem("category", event.target.name);
                          } else {
                            setCategory(null);
                            localStorage.removeItem("category");
                          }
                        }}
                      />
                      <label htmlFor="promises">JavaScript Promises</label>
                    </div>

                    <div>
                      <input
                        checked={category === "Javascript Classes"}
                        type="radio"
                        id="classes"
                        name="Javascript Classes"
                        onChange={(event) => {
                          if (event.target.checked) {
                            setCategory(event.target.name);
                            localStorage.setItem("category", event.target.name);
                          } else {
                            setCategory(null);
                            localStorage.removeItem("category");
                          }
                        }}
                      />
                      <label htmlFor="classes">JavaScript Classes</label>
                    </div>
                  </fieldset>
                </div>
              </>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  );
};

export default SettingsPanel;
