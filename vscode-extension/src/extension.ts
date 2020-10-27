'use strict';

import * as net from 'net';

import {Trace} from 'vscode-jsonrpc';
import { window, workspace, commands, ExtensionContext, Uri, TextDocument } from 'vscode';
import { LanguageClient, LanguageClientOptions, StreamInfo, Position as LSPosition, Location as LSLocation } from 'vscode-languageclient';

	let fileExtensions = ['fidl'];
	
export function activate(context: ExtensionContext) {
	

	
    // The server is a started as a separate app and listens on port 5008
    let connectionInfo = {
        port: 5008
    };
    let serverOptions = () => {
        // Connect to language server via socket
        let socket = net.connect(connectionInfo);
        let result: StreamInfo = {
            writer: socket,
            reader: socket
        };
        return Promise.resolve(result);
    };
    
    let clientOptions: LanguageClientOptions = {
        documentSelector: fileExtensions,
        synchronize: {
            fileEvents: workspace.createFileSystemWatcher('**/*.*')
        }
    };
    
    // Create the language client and start the client.
    let lc = new LanguageClient('Xtext Server', serverOptions, clientOptions);

    var disposable2 =commands.registerCommand("franca-socket", async () => {
        let activeEditor = window.activeTextEditor;
        if (!activeEditor || !activeEditor.document || !containsLanguage(activeEditor.document.languageId)) {
            return;
        }

        if (activeEditor.document.uri instanceof Uri) {
            commands.executeCommand("franca-socket", activeEditor.document.uri.toString());
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