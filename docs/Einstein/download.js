// =============================================================================
//
//          FILE: download.js
//
//         USAGE: ---
//   DESCRIPTION: This file provides functionality to allow the user to download
//                the latex project files. It uses the client-zip library:
//                https://github.com/Touffy/client-zip
//
//       OPTIONS: ---
//  REQUIREMENTS: ---
//          BUGS: ---
//         NOTES: ---
//        AUTHOR: Fabian Eberts
//  ORGANIZATION: ---
//       CREATED: ---
//      REVISION: ---
//
// =============================================================================

import { downloadZip } from "https://cdn.jsdelivr.net/npm/client-zip/index.js"

/*
 * zip project files and open a download dialog
 */
async function download()
{
    let download_files = [];

    // add project files to array:
    for(const file of files)
    {
        let file_add;

        if(file === main_tex_file) // copy main tex file from editor
        {
            file_add = { name: file, lastModified: new Date(), input: editor.getValue() };
        }
        else
        {
            file_add = await fetch(file);
        }

        download_files.push(file_add);
    }

    // add files uploaded by the user:
    for(const file of uploads)
    {
        download_files.push(file);
    }

    // zip files:
    const zip = await downloadZip(download_files).blob();

    // make and click a temporary link to download the archive:
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zip);
    link.download = template_name + '.zip';
    link.click();
    link.remove();
}

window.download = download; // make module function available
