import React from 'react'
import './../Faqs.scss'
export default function Collapsible({ title, children }) {
    const [isOpen, setOpen] = React.useState(false);
  return (
    <div className="accordion-wrapper">

      <div
        className={`accordion-title ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
        >
        {title} <span>{isOpen ? "-" : "+"}</span>
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  )
}
