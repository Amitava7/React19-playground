declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      'my-counter': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          count?: number
          label?: string
        },
        HTMLElement
      >
    }
  }
}
