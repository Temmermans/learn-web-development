import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { graphql, navigate, useStaticQuery } from "gatsby";
import React, { FC, useEffect, useRef } from "react";
import { useFlexSearch } from "react-use-flexsearch";

const Query: FC<{ index: string; store: Record<string, unknown> }> = ({ index, store }) => {
  const [query, setQuery] = React.useState("");
  const ref = useRef<HTMLInputElement>(null);
  const results = useFlexSearch(query, index, store);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  return (
    <>
      <input
        placeholder="Enter your search here..."
        ref={ref}
        className="text-search-input"
        value={query}
        onChange={(e) => {
          e.preventDefault();
          setQuery(e.target.value);
        }}
      />
      {results.length === 0 && query.length === 0 && (
        <div className="test-search-no-results">Please refine your search.</div>
      )}
      {results.length === 0 && query.length > 0 && <div className="test-search-no-results">No results found.</div>}
      {results.length > 0 && (
        <div className="text-search-results">
          {results.map((result) => {
            const matches = result.body.match(new RegExp("(.{0,50}(" + query + ").{0,50})", "gi"));
            const highlights = (matches || [])
              .slice(0, 3)
              .map((match) => {
                const replaced = match
                  .replace(new RegExp(query, "gi"), "<strong>$&</strong>")
                  .replace(/(\r\n|\n|\r)/gm, "");
                return `... ${replaced} ...`;
              })
              .map((html, i) => {
                return <p className="text-search-highlight" key={i} dangerouslySetInnerHTML={{ __html: html }}></p>;
              });

            return (
              <div onClick={() => navigate(result.path)} className="text-search-result" key={result.id}>
                <img src={`${result.course}.png`} />
                <div>
                  <a>{result.title}</a>
                  {highlights}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

const Search = (): JSX.Element => {
  const [mouseOver, setMouseOver] = React.useState(false);
  const [flexSearch, setFlexSearch] = React.useState<{ index: string; store: Record<string, unknown> } | null>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

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

  const data = useStaticQuery(graphql`
    {
      localSearchPages {
        publicIndexURL
        publicStoreURL
      }
    }
  `);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        e.preventDefault();
        setMouseOver(true);
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (mouseOver === true && flexSearch === null) {
      Promise.all([
        fetch(data.localSearchPages.publicIndexURL).then((response) => response.text()),
        fetch(data.localSearchPages.publicStoreURL).then((response) => response.json()),
      ]).then(([index, store]) => {
        setFlexSearch({ index, store });
      });
    }
  }, [mouseOver, flexSearch]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        id="search"
        onMouseOver={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        <i className="gg-search"></i> ⌘K
      </div>
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
                  {!flexSearch && (
                    <div className="loading">
                      <i className="gg-spinner-alt"></i>
                    </div>
                  )}
                  {flexSearch && <Query index={flexSearch.index} store={flexSearch.store} />}
                  <i onClick={() => setIsOpen(false)} className="gg-close"></i>
                </div>
              </>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  );
};

export default Search;
