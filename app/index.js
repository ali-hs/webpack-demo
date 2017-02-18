import './main.css';
import component from './component';

let domComponent = component();

document.body.appendChild(domComponent);

if( module.hot ) {
  module.hot.accept('./component', () => {
    const nextComponent = component();
    document.body.replaceChild(nextComponent, domComponent);
    domComponent = nextComponent;
  });
}
