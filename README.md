# dynamic-image-display

A Lightning Component to respond to real time Platform Events to have a real-time display of status.

Deploy using SFDX, click the button below:

[![Deploy](https://deploy-to-sfdx.com/dist/assets/images/DeployToSFDX.svg)](https://deploy-to-sfdx.com/deploy?template=https://github.com/chadevanssf/dynamic-image-display)

## Sample use case

After a routine servicing of a connected machine, an access panel is left open. The machine's sensors notice the door is not fully closed, and sends out a status that the door is open. IoT Explorer receives that message, and changes the status of the Asset in SF that the door is open. On the Asset record in SF, the image of the machine is dynamically updated, without having to refresh the page or record, that the door is open.

## Use

### Install

Install the component and custom metadata type from the repository

### Platform Event Creation/Re-use

- Find Platform Events under **Setup > Data > Platform Events**
- Two fields are required to be added
  - REQUIRED message field, **Long Text Area**
  - OPTIONAL key field, **Text**

### Extend Target Object

- Add a new field to track the status
  - Might be a **Text**, **Picklist**, **Multiselect Picklist**, or **Long Text Area**
  - values stored here map directly to the layer name used in the Custom Metadata Type

### Image Configuration

- Consist of the "base" layer that is always displayed
- Leveraging PNG and transparency, each layer can show an image overlay on the base, or over any other visible layers
- Recommend that each layer has the same dimensions as the base layer
- The associated image files show how this might work

### Custom Metadata Type Entry

Add a new entry to the Custom Metadata Type **Dynamic Image Display**

Note: you will also want to add a special layer for the base, this defines the size of the component, and will show at all times. Use PNG files for best results, using the transparency to show the base image through the other layers.

- **Dynamic Image Display Name** is the developer name for this entry, used in the settings of the component
- **Group** This is used to group the layers for the display to use, will also appear in the component configuration in, for example, App Builder
- **LayerName** This is the name of the layer, the value the status field would contain
- **ArchiveName** This is the name of the static resource zip file archive, storing the image
- **ImageName** This is the name of the image from the static resource or archive in the static resource

### Record Page Modification

Modify the Record Page for the target object from above to show this component.

- Suggested first use is on the right sidebar
- Channel is of the form "/event/Event__E"
- Use the target object developer field name from above (e.g. DisplayStatus__c)
- As appropriate, use the filter field info from the message and target object

## Testing

Sample configuration and data are provided to show how this all works together.

### Dynamically change the image

In the Dev Console, under Debug > Open Execute Anonymous Window, run this code:

```bash
List<TestEvent__e> evts = new List<TestEvent__e>();
evts.add(new TestEvent__e(
    Message__c = 'left;right'
  )
);
EventBus.publish(evts);
```

### Import the data

```bash
sfdx force:user:permset:assign -n Dynamic_Image_Display
sfdx force:data:tree:import -p ./data/Image_Status__c-Image_Status_Detail__c-plan.json
```

### Export the data

```bash
sfdx force:data:tree:export -q ./data/imagestatus.soql -p -d ./data/
```

### Other commands

```bash
sfdx force:source:deploy -p lightning-components/ -u c25did
```

## Resources
