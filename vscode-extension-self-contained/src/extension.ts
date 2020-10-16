'use strict';

import * as path from 'path';
import * as os from 'os';

import {Trace} from 'vscode-jsonrpc';
import { commands, window, workspace, ExtensionContext, Uri } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient';

	let fileExtensions = ['fidl', 'fdepl', 'fsdl', 'cdepl', 'fcdl'];
	
export function activate(context: ExtensionContext) {
	

	
    // The server is a locally installed in src/franca
    let launcher = os.platform() === 'win32' ? 'franca-standalone.bat' : 'franca-standalone';
    let script = context.asAbsolutePath(path.join('src', 'franca', 'bin', launcher));

    let serverOptions: ServerOptions = {
        run : { command: script },
        debug: { command: script, args: [], options: { env: createDebugEnv() } }
    };
    
    let clientOptions: LanguageClientOptions = {
        documentSelector: fileExtensions,
        synchronize: {
            fileEvents: workspace.createFileSystemWatcher('**/*.*')
        }
    };
    
    // Create the language client and start the client.
    let lc = new LanguageClient('Xtext Server', serverOptions, clientOptions);
    
    var disposable2 =commands.registerCommand("franca-standalone", async () => {
        let activeEditor = window.activeTextEditor;
        if (!activeEditor || !activeEditor.document || !containsLanguage(activeEditor.document.languageId)) {
            return;
        }

        if (activeEditor.document.uri instanceof Uri) {
            commands.executeCommand("franca-standalone", activeEditor.document.uri.toString());
        }
    })
    context.subscriptions.push(disposable2);
    
    // enable tracing (.Off, .Messages, Verbose)
    lc.trace = Trace.Verbose;
    let disposable = lc.start();
    
    // Push the disposable to the context's subscriptions so that the 
    // client can be deactivated on extension deactivation
    context.subscriptions.push(disposable);



}

	function containsLanguage(languageId: String) {
		fileExtensions.forEach(function (value) {
			if (value == languageId) () => { return true }
		});
		return false;
	};

function createDebugEnv() {
    return Object.assign({
        JAVA_OPTS:"-Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=8000,suspend=n,quiet=y"
    }, process.env)
}