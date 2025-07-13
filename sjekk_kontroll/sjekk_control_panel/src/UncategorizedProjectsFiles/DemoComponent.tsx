import { Home, Settings, User } from "lucide-react";
import BlockQuote from "../components/BlockQuote";
import Code from "../components/Code";
import Kbd from "../components/kbd";
import Slider from "../components/Slider";
import Tabs from "../components/Tabs";

export default function Demo() {
  return (
    <div className="max-w-8xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Enhanced UI Components Demo</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard (kbd) Component</h2>
        <p>
          Press <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> to copy and <Kbd>Ctrl</Kbd> + <Kbd>V</Kbd> to paste.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">BlockQuote Component</h2>
        <BlockQuote author="Albert Einstein">
          Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.
        </BlockQuote>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Code Component</h2>
        <Code language="js">
{`function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');`}
        </Code>
        <div className="mt-4">
          <Code language="jsx" dependencies={[
            "Button",
            "Input",
            "Select",
            "Textarea",
            "Checkbox",
            "Radio",
            "Switch",
            "Slider",
          ]}>
{`function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default function App() {
  return <Welcome name="World" />;
}`}
          </Code>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Enhanced Slider Component</h2>
        <Slider min={0} max={100} defaultValue={50} onChange={(value) => console.log(value)} color="green" />
        <div className="mt-4">
          <Slider min={0} max={10} step={1} defaultValue={5} onChange={(value) => console.log(value)} color="purple" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Enhanced Tabs Component</h2>
        <Tabs
          tabs={[
            {
              id: 'home',
              label: 'Home',
              icon: <Home size={18} />,
              color: '#3B82F6',
              content: <p>Welcome to the home tab!</p>,
            },
            {
              id: 'profile',
              label: 'Profile',
              icon: <User size={18} />,
              color: '#10B981',
              content: <p>This is your profile information.</p>,
            },
            {
              id: 'settings',
              label: 'Settings',
              icon: <Settings size={18} />,
              color: '#F59E0B',
              content: <p>Adjust your settings here.</p>,
            },
          ]}
        />
      </section>
    </div>
  );
}