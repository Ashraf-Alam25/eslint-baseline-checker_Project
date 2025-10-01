// This file demonstrates the ESLint plugin in action

// Some Baseline features (these should not trigger warnings)
document.querySelector('.element');
localStorage.setItem('key', 'value');
const url = new URL('https://example.com');
console.log('This is fine');

// Non-Baseline API features (these should trigger warnings)
navigator.share({ title: 'Share me', url: 'https://example.com' });
new Intl.DurationFormat('en').format({ hours: 2 });
navigator.clipboard.writeText('Copied text');

// CSS in template literals
const styledComponent = styled.div`
  /* Baseline CSS (no warnings) */
  display: flex;
  color: blue;
  
  /* Non-Baseline CSS (should trigger warnings) */
  div:has(> span) {
    container-type: inline-size;
  }
`;

// JSX with CSS
function MyComponent() {
  return (
    <div 
      style={{
        // Baseline CSS (no warnings)
        display: 'flex',
        backgroundColor: 'blue',
        
        // Non-Baseline CSS (should trigger warnings)
        aspectRatio: '16/9'
      }}
    >
      Content
    </div>
  );
}