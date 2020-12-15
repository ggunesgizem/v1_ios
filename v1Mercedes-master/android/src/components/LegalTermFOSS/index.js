import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'
import { fadeDuration, defaultFadeStyle, transitionfadeStyles } from '../../pages/App/transitions'
import T from 'i18n-react'
import '../../pages/LegalTerm/legalTerm.css'

import { selectLanguage } from '../../actions/languageAction'

class LegalTermFOSS extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    return (
      <div style={{height:"calc(100% - var(--main-nav-height))"}}>
        <Transition
          in={true}
          appear={true}
          timeout={fadeDuration}
        >
          {(state) => {
            return (
              <div style={{
                 ...defaultFadeStyle,
                 ...transitionfadeStyles[state]
               }}>
                 <div className="legal-container">
                   <div className="legal-title">
                     Ücretsiz ve Açık Kaynaklı Yazılım
                   </div>
                   <div className="legal-text">
                     <div className="legal-text-title">
                       Bu uygulamayı kullanarak, kullanıcı ücretsiz ve açık kaynaklı yazılım bileşenlerine ait özel şartları kabul eder.
                     </div>
                     <br />

                    
                     <div className="legal-text-title">
                       1. Axios
                     </div>
                     <div className="legal-text-container">
                       Version – v0.15.3
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2014 Matt Zabriskie
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       2. Bcrypt.net
                     </div>
                     <div className="legal-text-container">
                       Version – v2.1.0
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2006 Damien Miller djm@mindrot.org (jBCrypt)
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2013 Ryan D. Emerle (.Net port)
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2016/2017 Chris McKee (.Net-core port / patches)
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       3. BootStrap
                     </div>
                     <div className="legal-text-container">
                       Version – v3.3.7
                     </div>
                     <div className="legal-text-container">
                      Copyright © 2011-2016 Twitter, Inc.
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       4. Excel Data Reader
                     </div>
                     <div className="legal-text-container">
                       Version – v3.1.0
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2014 ExcelDataReader
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       5. fastclick
                     </div>
                     <div className="legal-text-container">
                     Version – v1.0.6
                     </div>
                     <div className="legal-text-container">
                     Copyright © 2014 The Financial Times Ltd.
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       6. google-map-react
                     </div>
                     <div className="legal-text-container">
                       Version – 0.22.3
                     </div>
                     <div className="legal-text-container">
                       Copyright © Ivan Starkov
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       7. jquery
                     </div>
                     <div className="legal-text-container">
                     Version – 3.2.1
                     </div>
                     <div className="legal-text-container">
                     Copyright © JS Foundation and other contributors, https://js.foundation/
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       8. inline-style-prefixer
                     </div>
                     <div className="legal-text-container">
                     Version 3.0.8
                     </div>
                     <div className="legal-text-container">
                     Copyright © 2015 Robin Frischmann
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       9. i18n-react
                     </div>
                     <div className="legal-text-container">
                       Version – release/0.4.0
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2015 Alex Drel
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       10. Imagesloaded
                     </div>
                     <div className="legal-text-container">
                       Version – v4.1.3
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2019 David DeSandro
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       11. Lodash
                     </div>
                     <div className="legal-text-container">
                       Version – 4.17.4
                     </div>
                     <div className="legal-text-container">
                       Copyright © JS Foundation and other contributors {`<https://js.foundation/>`}
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       12. material-ui
                     </div>
                     <div className="legal-text-container">
                       Version – 0.19.0
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2014 Call-Em-All
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       13. Moment
                     </div>
                     <div className="legal-text-container">
                       Version – 2.18.1
                     </div>
                     <div className="legal-text-container">
                       Copyright © JS Foundation and other contributors
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       14. Moment Timezone
                     </div>
                     <div className="legal-text-container">
                       Version – 0.5.13
                     </div>
                     <div className="legal-text-container">
                       Copyright © JS Foundation and other contributors
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       15. React
                     </div>
                     <div className="legal-text-container">
                       Version – v15.5.4
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2013-present Facebook, Inc.
                     </div>
                     <div className="legal-text-container">
                      All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       16. react-dom
                     </div>
                     <div className="legal-text-container">
                       Version – v15.5.4
                     </div>
                     <div className="legal-text-container">
                     Copyright © Facebook, Inc. and its affiliates.
                     </div>
                     <div className="legal-text-container">
                      All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>


                     <div className="legal-text-title">
                       17. react-hammerjs
                     </div>
                     <div className="legal-text-container">
                     Version – v0.50
                     </div>
                     <div className="legal-text-container">
                     Copyright © 2016 Jed Watson
                     </div>
                     <div className="legal-text-container">
                      All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>


                     <div className="legal-text-title">
                       18. react-image
                     </div>
                     <div className="legal-text-container">
                       Version – 1.3.1
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2018 Moshe Brevda
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       19. react-loading-overlay
                     </div>
                     <div className="legal-text-container">
                       Version – 0.2.8
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2015 Derrick Pelletier (https://github.com/derrickpelletier)
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       20. react-motion
                     </div>
                     <div className="legal-text-container">
                     Version – v0.4.7
                     </div>
                     <div className="legal-text-container">
                     Copyright © 2015 React Motion authors
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       21. react-redux
                     </div>
                     <div className="legal-text-container">
                       Version – v5.0.2
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2015-present Dan Abramov
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       22. react-router
                     </div>
                     <div className="legal-text-container">
                       Version – v3.0.2
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2015-present Ryan Florence, Michael Jackson
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       23. react-router-redux
                     </div>
                     <div className="legal-text-container">
                       Version – v4.0.8
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2015-present James Long
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       24. react-slick
                     </div>
                     <div className="legal-text-container">
                       Version – 0.14.6
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2014 Kiran Abburi
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       25. react-swipeable-tabs
                     </div>
                     <div className="legal-text-container">
                       Version – 2.2.0
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2017 Kareem Mohamed
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       26. redux
                     </div>
                     <div className="legal-text-container">
                       Version – v3.6.0
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2015-present Dan Abramov
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       27. redux-form
                     </div>
                     <div className="legal-text-container">
                       Version – v6.5.0
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2015 Erik Rasmussen
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       28. redux-localstorage
                     </div>
                     <div className="legal-text-container">
                       Version – v1.0.0-rc4
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2015 Elger Lambert
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       29. redux-thunk
                     </div>
                     <div className="legal-text-container">
                       Version – v2.2.0
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2015 Dan Abramov
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       30. SendGrid
                     </div>
                     <div className="legal-text-container">
                       Version – v9.9.0
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2012-2016 SendGrid, Inc.
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       31. slick
                     </div>
                     <div className="legal-text-container">
                       Version – 1.6.0
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2014 Ken Wheeler
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The MIT License
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <br />
                     <br />

                     <div className="legal-text-title">
                       1 – 31 arası UAKKY bileşenleri MIT License adı altında lisanslanmıştır. (Lisans metni aşağıdadır.)
                     </div>

                     <br />
                     <br />

                     <div className="legal-text-container">
                       Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
                     </div>
                     <div className="legal-text-container">
                       The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
                     </div>
                     <br/>
                     <div className="legal-text-container">
                       THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                     </div>

                     <br/>
                     <br/>

                     <div className="legal-text-title">
                       32. Apache Cordova Android
                     </div>
                     <div className="legal-text-container">
                     Version - 6.2.3
                     </div>
                     <div className="legal-text-container">
                     Copyright 2015 The Apache Software Foundation
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The Apache License Version 2.0
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       33. Entity Framework 6
                     </div>
                     <div className="legal-text-container">
                       Version - 6.1.3
                     </div>
                     <div className="legal-text-container">
                       Copyright © Microsoft Open Technologies, Inc.
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The Apache License Version 2.0
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       34. imgcache.js
                     </div>
                     <div className="legal-text-container">
                       Version – 1.1.0
                     </div>
                     <div className="legal-text-container">
                      Copyright © 2012-2016 Christophe BENOIT
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The Apache License Version 2.0
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       35. Log4net
                     </div>
                     <div className="legal-text-container">
                       Version - rc/2.0.8-RC1
                     </div>
                     <div className="legal-text-container">
                     Copyright 2004-2017 The Apache Software Foundation
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The Apache License Version 2.0
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       36. PushSharp
                     </div>
                     <div className="legal-text-container">
                       Version – 4.0.10
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2012-2015 Jonathan Dick
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The Apache License Version 2.0
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       37. Quartz.net
                     </div>
                     <div className="legal-text-container">
                       Version – v2.5.0
                     </div>
                     <div className="legal-text-container">
                       Copyright © Marko Lahma
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       The Apache License Version 2.0
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <br/>
                     <br/>

                     <div className="legal-text-title">
                       32 – 37 arası UAKKY bileşenleri Apache License Version 2 adı altında lisanslanmıştır. (Lisans metni aşağıdadır.)
                     </div>

                     <br/>
                     <br/>

                     <div className="legal-text-container">
                       TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
                     </div>
                     <br />
                     <div className="legal-text-container">
                       1. Definitions.
                     </div>

                     <br />

                     <div className="legal-text-container">
                       "License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.
                     </div>
                     <br />
                     <div className="legal-text-container">
                       "Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.
                     </div>
                     <br />
                     <div className="legal-text-container">
                       "Legal Entity" shall mean the union of the acting entity and all
                       other entities that control, are controlled by, or are under common
                       control with that entity. For the purposes of this definition,
                       "control" means (i) the power, direct or indirect, to cause the
                       direction or management of such entity, whether by contract or
                       otherwise, or (ii) ownership of fifty percent (50%) or more of the
                       outstanding shares, or (iii) beneficial ownership of such entity.
                     </div>
                     <br />
                     <div className="legal-text-container">
                       "You" (or "Your") shall mean an individual or Legal Entity
                       exercising permissions granted by this License.
                     </div>
                     <br />
                     <div className="legal-text-container">
                       "Source" form shall mean the preferred form for making modifications,
                       including but not limited to software source code, documentation
                       source, and configuration files.
                     </div>
                     <br />
                     <div className="legal-text-container">
                       "Object" form shall mean any form resulting from mechanical
                       transformation or translation of a Source form, including but
                       not limited to compiled object code, generated documentation,
                       and conversions to other media types.
                     </div>
                     <br />
                     <div className="legal-text-container">
                       "Work" shall mean the work of authorship, whether in Source or
                       Object form, made available under the License, as indicated by a
                       copyright notice that is included in or attached to the work
                       (an example is provided in the Appendix below).
                     </div>
                     <br />
                     <div className="legal-text-container">
                       "Derivative Works" shall mean any work, whether in Source or Object
                       form, that is based on (or derived from) the Work and for which the
                       editorial revisions, annotations, elaborations, or other modifications
                       represent, as a whole, an original work of authorship. For the purposes
                       of this License, Derivative Works shall not include works that remain
                       separable from, or merely link (or bind by name) to the interfaces of,
                       the Work and Derivative Works thereof.
                     </div>
                     <br />
                     <div className="legal-text-container">
                       "Contribution" shall mean any work of authorship, including
                       the original version of the Work and any modifications or additions
                       to that Work or Derivative Works thereof, that is intentionally
                       submitted to Licensor for inclusion in the Work by the copyright owner
                       or by an individual or Legal Entity authorized to submit on behalf of
                       the copyright owner. For the purposes of this definition, "submitted"
                       means any form of electronic, verbal, or written communication sent
                       to the Licensor or its representatives, including but not limited to
                       communication on electronic mailing lists, source code control systems,
                       and issue tracking systems that are managed by, or on behalf of, the
                       Licensor for the purpose of discussing and improving the Work, but
                       excluding communication that is conspicuously marked or otherwise
                       designated in writing by the copyright owner as "Not a Contribution."
                     </div>
                     <br />
                     <div className="legal-text-container">
                       "Contributor" shall mean Licensor and any individual or Legal Entity
                       on behalf of whom a Contribution has been received by Licensor and
                       subsequently incorporated within the Work.
                     </div>
                     <br />
                     <div className="legal-text-container">
                       2. Grant of Copyright License. Subject to the terms and conditions of
                       this License, each Contributor hereby grants to You a perpetual,
                       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
                       copyright license to reproduce, prepare Derivative Works of,
                       publicly display, publicly perform, sublicense, and distribute the
                       Work and such Derivative Works in Source or Object form.
                     </div>
                     <br />
                     <div className="legal-text-container">
                       3. Grant of Patent License. Subject to the terms and conditions of
                       this License, each Contributor hereby grants to You a perpetual,
                       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
                       (except as stated in this section) patent license to make, have made,
                       use, offer to sell, sell, import, and otherwise transfer the Work,
                       where such license applies only to those patent claims licensable
                       by such Contributor that are necessarily infringed by their
                       Contribution(s) alone or by combination of their Contribution(s)
                       with the Work to which such Contribution(s) was submitted. If You
                       institute patent litigation against any entity (including a
                       cross-claim or counterclaim in a lawsuit) alleging that the Work
                       or a Contribution incorporated within the Work constitutes direct
                       or contributory patent infringement, then any patent licenses
                       granted to You under this License for that Work shall terminate
                       as of the date such litigation is filed.
                     </div>
                     <br />
                     <div className="legal-text-container">
                       4. Redistribution. You may reproduce and distribute copies of the
                       Work or Derivative Works thereof in any medium, with or without
                       modifications, and in Source or Object form, provided that You
                       meet the following conditions:
                     </div>
                     <br />
                     <div className="legal-text-container">
                       (a) You must give any other recipients of the Work or
                       Derivative Works a copy of this License; and
                     </div>
                     <br />
                     <div className="legal-text-container">
                       (b) You must cause any modified files to carry prominent notices
                       stating that You changed the files; and
                     </div>
                     <br />
                     <div className="legal-text-container">
                       (c) You must retain, in the Source form of any Derivative Works
                       that You distribute, all copyright, patent, trademark, and
                       attribution notices from the Source form of the Work,
                       excluding those notices that do not pertain to any part of
                       the Derivative Works; and
                     </div>
                     <br />
                     <div className="legal-text-container">
                       (d) If the Work includes a "NOTICE" text file as part of its
                       distribution, then any Derivative Works that You distribute must
                       include a readable copy of the attribution notices contained
                       within such NOTICE file, excluding those notices that do not
                       pertain to any part of the Derivative Works, in at least one
                       of the following places: within a NOTICE text file distributed
                       as part of the Derivative Works; within the Source form or
                       documentation, if provided along with the Derivative Works; or,
                       within a display generated by the Derivative Works, if and
                       wherever such third-party notices normally appear. The contents
                       of the NOTICE file are for informational purposes only and
                       do not modify the License. You may add Your own attribution
                       notices within Derivative Works that You distribute, alongside
                       or as an addendum to the NOTICE text from the Work, provided
                       that such additional attribution notices cannot be construed
                       as modifying the License.
                     </div>
                     <br />
                     <div className="legal-text-container">
                       You may add Your own copyright statement to Your modifications and
                       may provide additional or different license terms and conditions
                       for use, reproduction, or distribution of Your modifications, or
                       for any such Derivative Works as a whole, provided Your use,
                       reproduction, and distribution of the Work otherwise complies with
                       the conditions stated in this License.
                     </div>
                     <br />
                     <div className="legal-text-container">
                       5. Submission of Contributions. Unless You explicitly state otherwise,
                       any Contribution intentionally submitted for inclusion in the Work
                       by You to the Licensor shall be under the terms and conditions of
                       this License, without any additional terms or conditions.
                       Notwithstanding the above, nothing herein shall supersede or modify
                       the terms of any separate license agreement you may have executed
                       with Licensor regarding such Contributions.
                     </div>
                     <br />
                     <div className="legal-text-container">
                       6. Trademarks. This License does not grant permission to use the trade
                       names, trademarks, service marks, or product names of the Licensor,
                       except as required for reasonable and customary use in describing the
                       origin of the Work and reproducing the content of the NOTICE file.
                     </div>
                     <br />
                     <div className="legal-text-container">
                       7. Disclaimer of Warranty. Unless required by applicable law or
                       agreed to in writing, Licensor provides the Work (and each
                       Contributor provides its Contributions) on an "AS IS" BASIS,
                       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
                       implied, including, without limitation, any warranties or conditions
                       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
                       PARTICULAR PURPOSE. You are solely responsible for determining the
                       appropriateness of using or redistributing the Work and assume any
                       risks associated with Your exercise of permissions under this License.
                     </div>
                     <br />
                     <div className="legal-text-container">
                       8. Limitation of Liability. In no event and under no legal theory,
                       whether in tort (including negligence), contract, or otherwise,
                       unless required by applicable law (such as deliberate and grossly
                       negligent acts) or agreed to in writing, shall any Contributor be
                       liable to You for damages, including any direct, indirect, special,
                       incidental, or consequential damages of any character arising as a
                       result of this License or out of the use or inability to use the
                       Work (including but not limited to damages for loss of goodwill,
                       work stoppage, computer failure or malfunction, or any and all
                       other commercial damages or losses), even if such Contributor
                       has been advised of the possibility of such damages.
                     </div>
                     <br />
                     <div className="legal-text-container">
                       9. Accepting Warranty or Additional Liability. While redistributing
                       the Work or Derivative Works thereof, You may choose to offer,
                       and charge a fee for, acceptance of support, warranty, indemnity,
                       or other liability obligations and/or rights consistent with this
                       License. However, in accepting such obligations, You may act only
                       on Your own behalf and on Your sole responsibility, not on behalf
                       of any other Contributor, and only if You agree to indemnify,
                       defend, and hold each Contributor harmless for any liability
                       incurred by, or claims asserted against, such Contributor by reason
                       of your accepting any such warranty or additional liability.
                     </div>

                     <br/>

                     <div className="legal-text-container">
                        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                     </div>

                     <br />
                     <br />

                     <div className="legal-text-title">
                        38. FluentScheduler
                     </div>
                     <div className="legal-text-container">
                       Version – 5.3.0
                     </div>
                     <div className="legal-text-container">
                       Copyright © Jim Geurts {"<"}jim@biacreations.com{">"}, Talles L {"<"}talleslasmar@gmail.com{">"}
                     </div>
                     <div className="legal-text-container">
                       All rights reserved.
                     </div>
                     <div className="legal-text-container">
                       BSD 3-Clause New BSD License (BSD)
                     </div>
                     <div className="legal-text-container">
                     </div>

                     <div className="legal-text-title">
                       39. react-transition-group
                     </div>
                     <div className="legal-text-container">
                       Version – v2.2.1
                     </div>
                     <div className="legal-text-container">
                       Copyright © 2016, React Community
                     </div>
                     <div className="legal-text-container">
                      Forked from React (https:github.com/facebook/react) Copyright 2013-present,
                      Facebook, Inc  All rights reserved.
                     </div>

                     <div className="legal-text-container">
                       BSD 3-Clause New BSD License (BSD)
                     </div>
                     <div className="legal-text-container">
                     </div>


                     <div className="legal-text-title">
                       40. sprintf.js
                     </div>
                     <div className="legal-text-container">
                     Version – 0.1.5
                     </div>
                     <div className="legal-text-container">
                     Copyright © 2007-present, Alexandru Mărășteanu hello@alexei.ro
                     </div>
                     <div className="legal-text-container">
                     All rights reserved.
                     BSD 3-Clause New BSD License (BSD)
                     </div>

                     <div className="legal-text-container">
                       BSD 3-Clause New BSD License (BSD)
                     </div>
                     <div className="legal-text-container">
                     </div>
                     <br/>
                     <br/>

                     <div className="legal-text-title">
                      38 ve 40 numaralı UAKKY bileşenleri BSD 3-Clause New BSD License (BSD) adı altında lisanslanmıştır. (Lisans metni aşağıdadır.)
                     </div>

                     <br />
                     <br />

                     <div className="legal-text-container">
                      Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                     </div>
                     <br/>
                     <div className="legal-text-container">
                      1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                     </div>
                     <br/>
                     <div className="legal-text-container">
                      2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                     </div>
                     <br/>
                     <div className="legal-text-container">
                      3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                     </div>
                     <br/>
                     <div className="legal-text-container">
                      THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                     </div>

                     <br/>

                   </div>
                 </div>
              </div>
            )
          }}
        </Transition>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.language.selectedLanguage,
  }
}

export default connect(mapStateToProps, { selectLanguage })(LegalTermFOSS)
