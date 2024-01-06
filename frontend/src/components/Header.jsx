function Header({ headerText, motto, authControl }) {
  return (
    <div className="page-header">
      <div className="row">

        <div className="col-lg-9">
          <h1>
            {headerText} <small>{motto}</small>
          </h1>
        </div>

        {authControl && (
          <div className="col-lg-3" style={{ textAlign: 'right' }}>
            <h2>
              <small>Giriş Yapıldı:)</small>
            </h2>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Header;
