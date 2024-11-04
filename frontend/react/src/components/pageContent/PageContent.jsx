import './pageContent.css';

const PageContent = ( { children, headerTitle = '', actions = [] } ) => {
  return (
    <div className='page-content'>
      <header className='page-content__header'>
        <div>
          <h2> { headerTitle }</h2>
        </div>
        <div className='page-content__header_actions'>
          { [ ...actions ] }
        </div>
      </header>
      <main className='page-content__main'>
        { children }
      </main>
    </div>
  );
};

export default PageContent;
