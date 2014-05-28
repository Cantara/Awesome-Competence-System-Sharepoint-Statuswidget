<%@ Page language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<WebPartPages:AllowFraming ID="AllowFraming" runat="server" />

<html>
<head>
    <title></title>

    <script type="text/javascript" src="../Scripts/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>

    <script type="text/javascript">
        'use strict';

        // Set the style of the client web part page to be consistent with the host web.
        (function () {
            var hostUrl = '';
            if (document.URL.indexOf('?') != -1) {
                var params = document.URL.split('?')[1].split('&');
                for (var i = 0; i < params.length; i++) {
                    var p = decodeURIComponent(params[i]);
                    if (/^SPHostUrl=/i.test(p)) {
                        hostUrl = p.split('=')[1];
                        document.write('<link rel="stylesheet" href="' + hostUrl + '/_layouts/15/defaultcss.ashx" />');
                        break;
                    }
                }
            }
            if (hostUrl == '') {
                document.write('<link rel="stylesheet" href="/_layouts/15/1033/styles/themable/corev15.css" />');
            }
        })();
    </script>
</head>
<body>
    <div style='position: absolute; top: 15px; left: 0px'>
        <table>
             <thead>
                <tr>
                <th>Your ACS profile status</th>
                </tr>
            </thead>
            <tbody id="statusTable" data-bind="foreach: get_profileStats()">
            <tr>
                <td>Status:</td>
                <td><span data-bind="text: get_cstatus()"></span></td>
            </tr>
            <tr>
                <td>Profile completed to:</td>
                <td><span data-bind="text: get_percent()"></span></td>
            </tr>
            <tr>
                <td>Last updated:</td>
                <td><span data-bind="text: get_lastupdated()"></span></td>
            </tr>
            <tr>             
            <td><a href="https://cv.altran.se/cv/" target="_top">To ACS</a></td>
            </tr>
            </tbody>
        </table>
        </div>
</body>
</html>
